import React, { useEffect, useState } from "react";
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
  <div className="w-24 h-24 relative flex items-center justify-center">
    <svg className="absolute top-0 left-0" width="96" height="96">
      <circle
        cx="48"
        cy="48"
        r="44"
        stroke="#e5e7eb"
        strokeWidth="8"
        fill="none"
      />
      <circle
        cx="48"
        cy="48"
        r="44"
        stroke="#14B8A6"
        strokeWidth="8"
        fill="none"
        strokeDasharray={2 * Math.PI * 44}
        strokeDashoffset={2 * Math.PI * 44 * (1 - value / 100)}
        strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 0.5s" }}
      />
    </svg>
    <span className="text-lg font-semibold text-[#003399] z-10">
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

  useEffect(() => {
    // Call startAssessment when the page opens
    const token = window.history.state && window.history.state.usr && window.history.state.usr.token;
    // if (token) {
    //   startAssessment(token).catch(() => {}); // Optionally handle error
    // }
    const fetchData = async () => {
      try {
        const data = await fetchAllQuestionUserData();
        setSurveys(data.surveys);

        // Check if there are any questions available
        const hasQuestions = data.surveys.some((survey: Survey) => 
          survey.questionCategories.some((category: QuestionCategory) => 
            category.questions.length > 0
          )
        );

        if (!hasQuestions) {
          setNoQuestions(true);
          setLoading(false);
          return;
        }

        // Collect pre-filled answers from questions
        const prefilledAnswers: Record<string, any> = {};
        data.surveys.forEach((survey: Survey) => {
          survey.questionCategories.forEach((category: QuestionCategory) => {
            category.questions.forEach((question: Question) => {
              if (question.answer && question.answer.answerData !== undefined && question.answer.answerData !== null) {
                prefilledAnswers[question.id] = question.answer.answerData;
              }
            });
          });
        });
        setAnswers(prefilledAnswers);
        setLoading(false);
      } catch (error: any) {
        setError(error.message || "Failed to load questions");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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
    return <div className="flex justify-center items-center min-h-screen"><Loader2/></div>;
  }
  
  if (noQuestions) {
    return (
      <StepperLayout
        title="Initial Assessment"
        description="Fast assessment for compliance readiness (5-7 minutes)"
        onPrevious={handleGoBack}
        previousLabel="Back to Organization"
        showStepper={true}
      >
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-gray-400" />
              </div>
              <h2 className="text-2xl font-bold text-[#003399] mb-2">
                No Initial Assessment Available
              </h2>
              <p className="text-gray-600 mb-6">
                You don't have an initial assessment yet. You can proceed to RegTech to continue your compliance journey.
              </p>
            </div>
            <div className="flex gap-4 justify-center">
              <button
                onClick={handleGoToRegtech}
                className="bg-[#003399] hover:bg-[#003399]/90 flex items-center gap-2 text-white px-6 py-3 rounded transition-colors"
              >
                Go to RegTech
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </StepperLayout>
    );
  }
  
  if (error || !currentQuestion) {
    return <div className="flex justify-center items-center min-h-screen">{error || "No questions found."}</div>;
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
      title="Initial Assessment"
      description="Fast assessment for compliance readiness (5-7 minutes)"
      onPrevious={handleGoBack}
      previousLabel="Back to Organization"
      showStepper={true}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-[#003399] mb-2">
                Initial Assessment
              </h1>
              <p className="text-gray-600 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Fast assessment for compliance readiness (5-7 minutes)
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500 mb-2">Progress</div>
              <CircularProgress value={progress} />
            </div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex items-center justify-between mb-2">
            <div className="text-xl text-[#003399] font-semibold">
              Question {currentIndex + 1} of {allQuestions.length}
            </div>
            <div className="flex gap-2 text-xs">
              {currentQuestion.tags?.map((tag) => (
                <span key={tag} className="bg-[#14B8A6]/10 text-[#14B8A6] px-2 py-1 rounded">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="mb-2 font-semibold">{currentQuestion.en_questionText}</div>
          {/* Optionally show description if available */}
          {/* <div className="mb-2 text-gray-500 text-sm">{currentQuestion.description}</div> */}
          {/* Render input based on type */}
          {currentQuestion.type === "single_choice" && (
            <div>
              {currentQuestion.options?.map((opt) => (
                <label key={opt.id} className="block mb-1">
                  <input
                    type="radio"
                    name={currentQuestion.id}
                    value={opt.id}
                    checked={answers[currentQuestion.id] === opt.id}
                    onChange={() => handleInputChange(currentQuestion.id, opt.id)}
                    className="mr-2"
                  />
                  {opt.en_value}
                </label>
              ))}
            </div>
          )}
          {currentQuestion.type === "multiple_choice" && (
            <div>
              {currentQuestion.options?.map((opt) => (
                <label key={opt.id} className="block mb-1">
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
                    className="mr-2"
                  />
                  {opt.en_value}
                </label>
              ))}
            </div>
          )}
          {currentQuestion.type === "yes_no" && (
            <div>
              <label className="mr-4">
                <input
                  type="radio"
                  name={currentQuestion.id}
                  value="yes"
                  checked={answers[currentQuestion.id] === true}
                  onChange={() => handleInputChange(currentQuestion.id, true)}
                  className="mr-2"
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name={currentQuestion.id}
                  value="no"
                  checked={answers[currentQuestion.id] === false}
                  onChange={() => handleInputChange(currentQuestion.id, false)}
                  className="mr-2"
                />
                No
              </label>
            </div>
          )}
          {currentQuestion.type === "text" && (
            <textarea
              className="w-full border rounded p-2"
              value={answers[currentQuestion.id] !== undefined && answers[currentQuestion.id] !== null && typeof answers[currentQuestion.id] !== 'object' ? String(answers[currentQuestion.id]) : ''}
              onChange={e => handleInputChange(currentQuestion.id, e.target.value)}
              placeholder="Type your answer here..."
            />
          )}
          {currentQuestion.type === "number" && (
            <input
              type="number"
              className="w-full border rounded p-2"
              value={answers[currentQuestion.id] !== undefined && answers[currentQuestion.id] !== null && typeof answers[currentQuestion.id] !== 'object' ? String(answers[currentQuestion.id]) : ''}
              onChange={e => handleInputChange(currentQuestion.id, e.target.value)}
              placeholder="Enter a number"
            />
          )}
          {currentQuestion.type === "date" && (
            <input
              type="date"
              className="w-full border rounded p-2"
              value={answers[currentQuestion.id] !== undefined && answers[currentQuestion.id] !== null && typeof answers[currentQuestion.id] !== 'object' ? String(answers[currentQuestion.id]) : ''}
              onChange={e => handleInputChange(currentQuestion.id, e.target.value)}
            />
          )}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="flex items-center gap-2 border px-4 py-2 rounded text-[#003399] border-[#003399] disabled:opacity-50"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>
          <div className="flex gap-2">
            {allQuestions.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  i === currentIndex
                    ? 'bg-[#003399]'
                    : answers[allQuestions[i].id]
                    ? 'bg-[#14B8A6]'
                    : 'bg-gray-300'
                }`}
                aria-label={`Go to question ${i + 1}`}
              />
            ))}
          </div>
          {currentIndex === allQuestions.length - 1 ? (
            <button
              onClick={async () => await handleSubmitAnswers()}
              className="bg-[#003399] hover:bg-[#003399]/90 flex items-center gap-2 text-white px-4 py-2 rounded disabled:opacity-50"
              disabled={!allAnswered}
            >
              Finish & Submit
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={currentIndex === allQuestions.length - 1}
              className="bg-[#003399] hover:bg-[#003399]/90 flex items-center gap-2 text-white px-4 py-2 rounded disabled:opacity-50"
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
