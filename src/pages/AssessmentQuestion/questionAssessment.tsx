import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAllQuestionUserData, submitAnswersApi } from "@/services/assessmentQuestionServices";
import { startAssessment, endAssessment } from "@/services/steperService";
import { ChevronLeft, ChevronRight, Clock, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ToastContainer, toast as toastify } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { StepperLayout } from "@/components/StepperLayout";
import { useRegistration, REGISTRATION_STEPS } from "@/context/RegistrationContext";

// Define types for the question and answer data
interface Question {
  id: string;
  type: "text" | "multiple_choice" | "yes_no" | "number" | "date" | "single_choice";
  en_questionText: string;
  ar_questionText: string;
  options?: { id: string; en_value: string; ar_value: string }[];
  answer?: { answerData: string | string[] | number | boolean };
  tags?: string[];
}

interface QuestionCategory {
  en_name: string;
  ar_name: string;
  questions: Question[];
}

interface Survey {
  id: string;
  title: string;
  questionCategories: QuestionCategory[];
}

interface Answer {
  questionId: string;
  answerData: string | string[] | number | boolean;
}

const CircularProgress = ({ value }: { value: number }) => (
  <div className="w-20 h-20 relative flex items-center justify-center">
    <svg className="absolute top-0 left-0" width="80" height="80">
      <circle
        cx="40"
        cy="40"
        r="36"
        stroke="hsl(var(--muted))"
        strokeWidth="6"
        fill="none"
      />
      <circle
        cx="40"
        cy="40"
        r="36"
        stroke="hsl(var(--accent))"
        strokeWidth="6"
        fill="none"
        strokeDasharray={2 * Math.PI * 36}
        strokeDashoffset={2 * Math.PI * 36 * (1 - value / 100)}
        strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 0.5s" }}
      />
    </svg>
    <span className="text-sm font-semibold text-foreground z-10">
      {Math.round(value)}%
    </span>
  </div>
);

const RateAssessment = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { goToStep } = useRegistration();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [answers, setAnswers] = useState<Record<string, string | string[] | number | boolean>>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [noQuestions, setNoQuestions] = useState(false);

  // Flatten all questions for navigation
  const allQuestions: Question[] = surveys
    .flatMap((survey) => survey.questionCategories)
    .flatMap((category) => category.questions);

  // 1. Add allAnswered variable above the return statement
  const allAnswered = allQuestions.length > 0 && allQuestions.every(q => {
    const val = answers[q.id];
    if (q.type === "multiple_choice") return Array.isArray(val) && val.length > 0;
    return val !== undefined && val !== null && val !== "";
  });

  const fetchData = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      const data = await fetchAllQuestionUserData();
      setSurveys(data.surveys ?? []);

      const hasQuestions = (data.surveys ?? []).some((survey: Survey) =>
        survey.questionCategories?.some((category: QuestionCategory) =>
          category.questions?.length > 0
        )
      );

      if (!hasQuestions) {
        setNoQuestions(true);
        setLoading(false);
        return;
      }

      const prefilledAnswers: Record<string, any> = {};
      (data.surveys ?? []).forEach((survey: Survey) => {
        survey.questionCategories?.forEach((category: QuestionCategory) => {
          category.questions?.forEach((question: Question) => {
            if (question.answer && question.answer.answerData !== undefined && question.answer.answerData !== null) {
              prefilledAnswers[question.id] = question.answer.answerData;
            }
          });
        });
      });
      setAnswers(prefilledAnswers);
    } catch (err: any) {
      setError(err.message || "Failed to load questions");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Progress: only advance for answered questions
  const answeredCount = allQuestions.filter(q => answers[q.id] !== undefined && answers[q.id] !== null && answers[q.id] !== "").length;
  const progress = allQuestions.length > 0 ? (answeredCount / allQuestions.length) * 100 : 0;
  const currentQuestion = allQuestions[currentIndex];

  const handleInputChange = (questionId: string, value: string | string[] | number | boolean) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
    // Removed API call here
  };

  // New function to submit the current answer when navigating
  const submitCurrentAnswer = async () => {
    const question = allQuestions[currentIndex];
    if (!question) return;
    const answerData = answers[question.id];
    if (answerData === undefined || answerData === null || answerData === "") return;
    try {
      await submitAnswersApi([{ questionId: question.id, answerData }]);
    } catch (e) {
      // Optionally show error
    }
  };

  const handleNext = async () => {
    await submitCurrentAnswer();
    if (currentIndex < allQuestions.length - 1) setCurrentIndex(i => i + 1);
  };
  const handlePrevious = () => {
    if (currentIndex > 0) setCurrentIndex(i => i - 1);
  };

  const handleGoBack = () => {
    goToStep(REGISTRATION_STEPS.PERSONAL_INFO);
  };

  const handleGoToRegtech = () => {
    window.location.href = import.meta.env.VITE_REGTECH_URL || 'https://go.comply.now/';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-background">
        <Loader2 className="w-12 h-12 text-accent animate-spin" />
      </div>
    );
  }

  if (noQuestions) {
    return (
      <StepperLayout
        variant="landing"
        showHeader={false}
        title="Initial Assessment"
        description="Fast assessment for compliance readiness (5-7 minutes)"
        onPrevious={handleGoBack}
        previousLabel="Back to Organization"
        showStepper={true}
      >
        <div className="rounded-xl border border-border overflow-hidden bg-background/40 flex flex-col items-center justify-center py-8 px-6 text-center">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-accent/20 border border-accent/30">
            <Clock className="w-8 h-8 text-accent" />
          </div>
          <h2 className="text-xl font-bold text-foreground mb-2">
            No Initial Assessment Available
          </h2>
          <p className="text-muted-foreground text-sm max-w-md mb-6">
            You don't have an initial assessment yet. You can proceed to RegTech to continue your compliance journey.
          </p>
          <button
            type="button"
            onClick={handleGoToRegtech}
            className="btn-gradient flex items-center gap-2 text-white px-6 py-3 rounded-xl font-medium"
          >
            Go to RegTech
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </StepperLayout>
    );
  }
  
  if (error || !currentQuestion) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-background px-4">
        <div className="max-w-md w-full text-center space-y-6">
          <p className="text-foreground text-lg">{error || "No questions found."}</p>
          <p className="text-muted-foreground text-sm">
            If this keeps happening, the backend may be down or returning an error. Check the server logs at localhost:5040.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              type="button"
              onClick={() => fetchData()}
              className="btn-gradient px-6 py-3 rounded-xl text-white font-medium"
            >
              Retry
            </button>
            <button
              type="button"
              onClick={() => navigate("/know-my-org")}
              className="btn-glass px-6 py-3 rounded-xl font-medium text-foreground"
            >
              Back to Organization
            </button>
          </div>
        </div>
      </div>
    );
  }
  async function handleSubmitAnswers() {
    if (!allAnswered) {
      toast({ title: "Please answer all questions before submitting.", variant: "destructive" });
      toastify.error("Please answer all questions before submitting.");
      return;
    }
    // Submit all answers at the end
    try {
      const formattedAnswers = Object.keys(answers)
        .map((questionId): Answer | null => {
          const question = allQuestions.find((q) => q.id === questionId);
          if (!question) return null;
          let answerData: string | string[] | number | boolean = answers[questionId];
          switch (question.type) {
            case "yes_no":
              answerData = Boolean(answerData);
              break;
            case "number":
              answerData = Number(answerData) || 0;
              break;
            case "multiple_choice":
              answerData = Array.isArray(answerData) ? answerData.map(String) : [String(answerData)];
              break;
            case "text":
            case "date":
              answerData = String(answerData);
              break;
          }
          if (answerData === undefined || answerData === null || answerData === "") {
            return null;
          }
          return { questionId, answerData };
        })
        .filter((answer): answer is Answer => answer !== null);
      if (formattedAnswers.length === 0) {
        toast({ title: "No answers to submit", variant: "destructive" });
        toastify.error("No answers to submit");
        return;
      }
      const result = await submitAnswersApi(formattedAnswers);

      // Call endAssessment when all questions are answered and submitted
      const token = window.history.state && window.history.state.usr && window.history.state.usr.token;
      if (token) {
        const endResult = await endAssessment(token);
        // Save the token from the response as d_c_c_t in localStorage
        if (endResult && endResult.data && endResult.data.token) {
          localStorage.removeItem("token");
          localStorage.setItem("d_c_c_t", endResult.data.token);
        }
      }
  
      if (result.success) {
        toast({ title: "Submitted successfully", variant: "default" });
        toastify.success("Submitted successfully");
        // Redirect to external URL
        window.location.href = import.meta.env.VITE_REGTECH_URL || 'https://go.comply.now/';
      } else {
        setError(result.message || "Failed to submit answers");
        toast({ title: result.message || "Failed to submit answers", variant: "destructive" });
        toastify.error(result.message || "Failed to submit answers");
      }
    } catch (error: any) {
      setError(error.message || "Failed to submit answers");
      toast({ title: error.message || "Failed to submit answers", variant: "destructive" });
      toastify.error(error.message || "Failed to submit answers");
    }
  }
  return (
    <StepperLayout
      variant="landing"
      showHeader={false}
      title="Initial Assessment"
      description="Fast assessment for compliance readiness (5-7 minutes)"
      onPrevious={handleGoBack}
      previousLabel="Back to Organization"
      showStepper={true}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-1">
                Initial Assessment
              </h1>
              <p className="text-muted-foreground text-sm flex items-center gap-2">
                <Clock className="w-4 h-4 text-accent" />
                Fast assessment for compliance readiness (5-7 minutes)
              </p>
            </div>
            <div className="text-right">
              <div className="text-xs text-muted-foreground mb-1">Progress</div>
              <CircularProgress value={progress} />
            </div>
          </div>
        </div>

        {/* Question Card */}
        <div className="glass border border-border rounded-xl p-5 mb-5">
          <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
            <div className="text-lg font-semibold text-foreground">
              Question {currentIndex + 1} of {allQuestions.length}
            </div>
            <div className="flex gap-2 text-xs flex-wrap">
              {currentQuestion.tags?.map((tag) => (
                <span key={tag} className="bg-accent/20 text-accent border border-accent/30 px-2 py-1 rounded">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="mb-3 font-semibold text-foreground">{currentQuestion.en_questionText}</div>
          {/* Optionally show description if available */}
          {/* <div className="mb-2 text-gray-500 text-sm">{currentQuestion.description}</div> */}
          {/* Render input based on type */}
          {currentQuestion.type === "single_choice" && (
            <div className="space-y-2">
              {currentQuestion.options?.map((opt) => (
                <label key={opt.id} className="flex items-center gap-2 p-3 rounded-lg border border-border bg-background/50 hover:border-accent/50 cursor-pointer text-foreground">
                  <input
                    type="radio"
                    name={currentQuestion.id}
                    value={opt.id}
                    checked={answers[currentQuestion.id] === opt.id}
                    onChange={() => handleInputChange(currentQuestion.id, opt.id)}
                    className="accent-accent"
                  />
                  {opt.en_value}
                </label>
              ))}
            </div>
          )}
          {currentQuestion.type === "multiple_choice" && (
            <div className="space-y-2">
              {currentQuestion.options?.map((opt) => (
                <label key={opt.id} className="flex items-center gap-2 p-3 rounded-lg border border-border bg-background/50 hover:border-accent/50 cursor-pointer text-foreground">
                  <input
                    type="checkbox"
                    name={currentQuestion.id}
                    value={opt.id}
                    checked={Array.isArray(answers[currentQuestion.id]) && (answers[currentQuestion.id] as string[]).includes(opt.id)}
                    onChange={e => {
                      const current = Array.isArray(answers[currentQuestion.id]) ? answers[currentQuestion.id] as string[] : [];
                      const newValue = e.target.checked
                        ? [...current, opt.id]
                        : current.filter(id => id !== opt.id);
                      handleInputChange(currentQuestion.id, newValue);
                    }}
                    className="accent-accent"
                  />
                  {opt.en_value}
                </label>
              ))}
            </div>
          )}
          {currentQuestion.type === "yes_no" && (
            <div className="flex gap-4">
              <label className="flex items-center gap-2 p-3 rounded-lg border border-border bg-background/50 hover:border-accent/50 cursor-pointer text-foreground">
                <input
                  type="radio"
                  name={currentQuestion.id}
                  value="yes"
                  checked={answers[currentQuestion.id] === true}
                  onChange={() => handleInputChange(currentQuestion.id, true)}
                  className="accent-accent"
                />
                Yes
              </label>
              <label className="flex items-center gap-2 p-3 rounded-lg border border-border bg-background/50 hover:border-accent/50 cursor-pointer text-foreground">
                <input
                  type="radio"
                  name={currentQuestion.id}
                  value="no"
                  checked={answers[currentQuestion.id] === false}
                  onChange={() => handleInputChange(currentQuestion.id, false)}
                  className="accent-accent"
                />
                No
              </label>
            </div>
          )}
          {currentQuestion.type === "text" && (
            <textarea
              className="w-full border border-border rounded-lg p-3 bg-background/80 text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none"
              value={answers[currentQuestion.id] !== undefined && answers[currentQuestion.id] !== null && typeof answers[currentQuestion.id] !== 'object' ? String(answers[currentQuestion.id]) : ''}
              onChange={e => handleInputChange(currentQuestion.id, e.target.value)}
              placeholder="Type your answer here..."
            />
          )}
          {currentQuestion.type === "number" && (
            <input
              type="number"
              className="w-full border border-border rounded-lg p-3 bg-background/80 text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none"
              value={answers[currentQuestion.id] !== undefined && answers[currentQuestion.id] !== null && typeof answers[currentQuestion.id] !== 'object' ? String(answers[currentQuestion.id]) : ''}
              onChange={e => handleInputChange(currentQuestion.id, e.target.value)}
              placeholder="Enter a number"
            />
          )}
          {currentQuestion.type === "date" && (
            <input
              type="date"
              className="w-full border border-border rounded-lg p-3 bg-background/80 text-foreground focus:border-accent focus:outline-none"
              value={answers[currentQuestion.id] !== undefined && answers[currentQuestion.id] !== null && typeof answers[currentQuestion.id] !== 'object' ? String(answers[currentQuestion.id]) : ''}
              onChange={e => handleInputChange(currentQuestion.id, e.target.value)}
            />
          )}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <button
            type="button"
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="flex items-center gap-2 border border-border px-4 py-2 rounded-xl text-foreground hover:bg-muted disabled:opacity-50"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>
          <div className="flex gap-1.5 flex-wrap justify-center">
            {allQuestions.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCurrentIndex(i)}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  i === currentIndex
                    ? 'bg-accent'
                    : answers[allQuestions[i].id]
                    ? 'bg-accent/60'
                    : 'bg-muted'
                }`}
                aria-label={`Go to question ${i + 1}`}
              />
            ))}
          </div>
          {currentIndex === allQuestions.length - 1 ? (
            <button
              type="button"
              onClick={async () => await handleSubmitAnswers()}
              className="btn-gradient flex items-center gap-2 text-white px-4 py-2 rounded-xl disabled:opacity-50"
              disabled={!allAnswered}
            >
              Finish & Submit
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNext}
              disabled={currentIndex === allQuestions.length - 1}
              className="btn-gradient flex items-center gap-2 text-white px-4 py-2 rounded-xl disabled:opacity-50"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
      <ToastContainer />
    </StepperLayout>
  );


}

export default RateAssessment;
