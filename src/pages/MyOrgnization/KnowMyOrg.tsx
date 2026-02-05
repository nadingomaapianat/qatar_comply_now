import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Building2, Globe, MapPin, Loader2, CheckCircle, Clock,
   Users, TrendingUp, Search, Database, Shield, Edit, Activity, 
   FileText, Award, ExternalLink, Link, Info, AlertCircle, Phone,
    Mail, Calendar, DollarSign, BarChart3, Network, Server, Lock, 
    Eye, FileCheck, BookOpen, Target, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { euCountries } from "./countries";


// Helper function to get country code from country name
const getCountryCode = (countryName: string): string | undefined => {
  const country = euCountries.find(c => c.name.toLowerCase() === countryName.toLowerCase());
  return country?.code;
};
import { toast } from 'sonner';
import ReactCountryFlag from "react-country-flag";
import { getInformationUserRegister, fetchEntitiesByName } from '@/services/organizationServices';
import { useRegistration } from '@/context/RegistrationContext';
import { submitOrganizationInfo, getRegistrationStatus } from '@/services/steperService';
import { StepperLayout } from '@/components/StepperLayout';
import { OrganizationVerificationModal } from './popupVerify';
import ParticleField from '@/components/animations/ParticleField';

interface OrganizationProfile {
  name: string;
  country: string;
  website: string;
  entityType: string;
  size: string;
  services: string[];
  recentActivity: string;
}

interface ComplianceObjective {
  id: string;
  name: string;
  deadline: string;
  priority: 'high' | 'medium' | 'low';
  selected: boolean;
}

interface AgentStep {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'processing' | 'completed';
  source?: string;
  icon: React.ReactNode;
}

// Helper: basic validateForm
function validateForm(formData: any) {
  const errors: { [key: string]: string } = {};
  if (!formData.companyName.trim()) errors.companyName = 'Company name is required';
  if (!formData.country.trim()) errors.country = 'Country is required';
  if (!formData.website.trim()) errors.website = 'Website is required';
  return errors;
}

// Helper to flatten AI API companyData response with source preservation
function flattenCompanyData(apiData: any) {
  return {
    organization_name: {
      value: apiData.organization_name?.value || "",
      source: apiData.organization_name?.source || []
    },
    entity_type: {
      value: apiData.entity_type?.value || "",
      source: apiData.entity_type?.source || []
    },
    headquarters_country: {
      value: apiData.headquarters_country?.value || "",
      source: apiData.headquarters_country?.source || []
    },
    headquarters_country_for_db: {
      value: apiData.headquarters_country_for_db?.value || "",
      source: apiData.headquarters_country_for_db?.source || []
    },
    industry_sectors: {
      value: apiData.industry_sectors?.value || [],
      source: apiData.industry_sectors?.source || []
    },
    key_services: {
      value: apiData.key_services?.value || [],
      source: apiData.key_services?.source || []
    },
    compliance_certifications: {
      value: apiData.compliance_certifications?.value || [],
      source: apiData.compliance_certifications?.source || []
    },
    applicable_compliance_frameworks: {
      value: apiData.applicable_compliance_frameworks?.value || [],
      source: apiData.applicable_compliance_frameworks?.source || []
    },
    regulatory_registrations: {
      value: apiData.regulatory_registrations?.value || [],
      source: apiData.regulatory_registrations?.source || []
    },
    regulatory_details: apiData.regulatory_details || {},
    recent_press: {
      value: apiData.recent_press?.value || [],
      source: apiData.recent_press?.source || []
    },
    business_constraints: {
      value: apiData.business_constraints?.value || {},
      source: apiData.business_constraints?.source || []
    },
    company_size: {
      value: apiData.company_size?.value || {},
      source: apiData.company_size?.source || []
    },
    institution_id: {
      value: apiData.institution_id?.value || "",
      source: apiData.institution_id?.source || []
    },
    business_objectives: {
      value: apiData.business_objectives?.value || [],
      source: apiData.business_objectives?.source || []
    }
  };
}

const KnowMyOrg = () => {
  const navigate = useNavigate();
  const { 
    token, 
    userData, 
    setUserData, 
    nextStep, 
    prevStep,
    isRestoring,
    currentStep,
    goToStep,
    setCurrentStep
  } = useRegistration();
  
  // Add custom styles for review step layout
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .review-step-layout .container {
        max-width: none !important;
      }
      .review-step-layout main .container {
        max-width: none !important;
      }
      .review-step-layout main .max-w-4xl {
        max-width: none !important;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  
  const [step, setStep] = useState<'input' | 'loading' | 'review'>('input');
  const [formData, setFormData] = useState({
    companyName: '',
    country: '',
    city: '',
    website: '',
  });
  const [references, setReferences] = useState<{ id: string; name: string }[]>([]);
  const [selected, setSelected] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAiThinkingModal, setShowAiThinkingModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [companyData, setCompanyData] = useState<any>(null);
  const [registrationResponse, setRegistrationResponse] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');


  const [organizationProfile, setOrganizationProfile] = useState<OrganizationProfile | null>(null);
  const [objectives, setObjectives] = useState<ComplianceObjective[]>([
    { id: 'dora', name: 'Egypt', deadline: '17 Jan 2025', priority: 'high', selected: true },
    { id: 'nis2', name: 'NIS2', deadline: '18 Oct 2024', priority: 'high', selected: true },
    { id: 'ISO22301', name: 'ISO22301', deadline: 'Ongoing', priority: 'medium', selected: false }
  ]);

  // Enhanced objectives management
  const [editingObjective, setEditingObjective] = useState<string | null>(null);
  const [showAddObjective, setShowAddObjective] = useState(false);
  const [newObjective, setNewObjective] = useState({
    name: '',
    deadline: '',
    priority: 'medium' as 'high' | 'medium' | 'low',
    description: ''
  });

  // Enhanced data editing for review step
  const [editingData, setEditingData] = useState<string | null>(null);
  const [editableCompanyData, setEditableCompanyData] = useState<any>(null);

  const [agentSteps, setAgentSteps] = useState<AgentStep[]>([]);
  const [showVerificationModal, setShowVerificationModal] = useState(false);

  const [originalFormData, setOriginalFormData] = useState<any>(null);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);

  // Dynamic org search states
  const [showOrgDropdown, setShowOrgDropdown] = useState(false);
  const [orgSearchTerm, setOrgSearchTerm] = useState('');
  const [orgIsOther, setOrgIsOther] = useState(false);
  const [entities, setEntities] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [orgSearchResults, setOrgSearchResults] = useState<any[]>([]);
  const [orgAllResults, setOrgAllResults] = useState<any[]>([]); // All companies fetched from API
  const [orgFilteredResults, setOrgFilteredResults] = useState<any[]>([]); // Filtered locally
  const [orgSearchLoading, setOrgSearchLoading] = useState(false);
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);
  const [selectedOrganization, setSelectedOrganization] = useState<any | null>(null);
  


  const [showVerifyModal, setShowVerifyModal] = useState(false);

  // State for business objectives selection
  const [selectedBusinessObjectives, setSelectedBusinessObjectives] = useState<Set<string>>(new Set());
  
  // State for compliance frameworks selection
  const [selectedComplianceFrameworks, setSelectedComplianceFrameworks] = useState<Set<string>>(new Set());

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.org-dropdown-container')) {
        setShowOrgDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Pre-fill form with existing data if available
  useEffect(() => {
    if (userData.organizationInfo) {
      const initial = {
        companyName: userData.organizationInfo.tenantName || '',
        country: userData.organizationInfo.country || '',
        city: userData.organizationInfo.city || '',
        website: userData.organizationInfo.website || '',
      };
      setFormData(initial);
      setOriginalFormData(initial);
      setHasAnalyzed(true);
      if (userData.organizationInfo.country) {
        setSearchTerm(userData.organizationInfo.country);
        setSelected(userData.organizationInfo.country);
      }
      // Load company data if available
      if (userData.organizationInfo.companyData) {
        const loadedCompanyData = userData.organizationInfo.companyData[0] || userData.organizationInfo.companyData;
        // Don't filter here - keep all data for display, filtering happens when sending to backend
        setCompanyData(loadedCompanyData);
        setEditableCompanyData(loadedCompanyData);
        setStep('review');
      }
    }
  }, [userData.organizationInfo]);

  // Initialize selected business objectives and compliance frameworks when companyData is loaded
  useEffect(() => {
    if (companyData) {
      // Initialize business objectives selection from saved data or companyData
      const savedBusinessObjs = userData.organizationInfo?.selectedBusinessObjectives || [];
      const businessObjectives = companyData.business_objectives?.value || [];
      
      if (savedBusinessObjs.length > 0) {
        // Use saved selections if available
        setSelectedBusinessObjectives(new Set(savedBusinessObjs.map((obj: any) => obj.id)));
      } else if (businessObjectives.length > 0) {
        // Otherwise pre-select all business objectives by default
        setSelectedBusinessObjectives(new Set(businessObjectives.map((obj: any) => obj.id)));
      }
      
      // Initialize compliance frameworks selection from saved data or companyData
      const savedComplianceFws = userData.organizationInfo?.selectedComplianceFrameworks || [];
      const complianceFrameworks = companyData.applicable_compliance_frameworks?.value || [];
      
      if (savedComplianceFws.length > 0) {
        // Use saved selections if available
        setSelectedComplianceFrameworks(new Set(savedComplianceFws.map((fw: any) => fw.id)));
      } else if (complianceFrameworks.length > 0) {
        // Otherwise pre-select all compliance frameworks by default
        setSelectedComplianceFrameworks(new Set(complianceFrameworks.map((fw: any) => fw.id)));
      }
    }
  }, [companyData, userData.organizationInfo]);

  useEffect(() => {
    setOrgSearchTerm(formData.companyName);
  }, [formData.companyName]);



  // Fetch all companies on mount
  useEffect(() => {
    setOrgSearchLoading(true);
    fetchEntitiesByName('')
      .then(results => {
        setOrgAllResults(results);
        setOrgFilteredResults(results);
      })
      .catch(() => {
        setOrgAllResults([]);
        setOrgFilteredResults([]);
      })
      .finally(() => setOrgSearchLoading(false));
  }, []);



  const handleSelect = (countryName: string) => {
    setSelected(countryName);
    setShowDropdown(false);
    // Clear city when country changes
    setFormData(prev => ({ ...prev, city: '' }));
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setHasAnalyzed(false); // Mark as dirty
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
    
    // Clear city when country changes since cities are country-specific
    if (field === 'country') {
      setFormData(prev => ({ ...prev, city: '' }));
    }
  };

  // Search handler with debouncing and country filtering
  const handleSearch = async (searchValue: string) => {
    if (!searchValue || searchValue.trim().length < 2) {
      setOrgFilteredResults([]);
      return;
    }

    setOrgSearchLoading(true);
    try {
      const results = await fetchEntitiesByName(searchValue);
      setOrgAllResults(results);
      
      // No local filtering needed since API returns Qatar entities
      setOrgFilteredResults(results);
    } catch {
      setOrgAllResults([]);
      setOrgFilteredResults([]);
    } finally {
      setOrgSearchLoading(false);
    }
  };

  // Debounced search effect
  useEffect(() => {
    // Clear existing timeout
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    // Only search if we have at least 2 characters
    if (orgSearchTerm && orgSearchTerm.trim().length >= 2) {
      const timeout = setTimeout(() => {
        handleSearch(orgSearchTerm);
      }, 500); // 500ms delay
      setSearchTimeout(timeout);
    } else {
      setOrgFilteredResults([]);
    }

    // Cleanup timeout on unmount
    return () => {
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
    };
  }, [orgSearchTerm]);

  // Handle dropdown focus - show all companies when input is focused and empty
  useEffect(() => {
    if (showOrgDropdown && orgSearchTerm.trim().length === 0) {
      setOrgSearchLoading(true);
      fetchEntitiesByName('')
        .then(results => {
          setOrgSearchResults(results);
          setOrgFilteredResults(results);
        })
        .catch(() => {
          setOrgSearchResults([]);
          setOrgFilteredResults([]);
        })
        .finally(() => setOrgSearchLoading(false));
    }
  }, [showOrgDropdown]);



  const handleOrgInputChange = (value: string) => {
    setOrgSearchTerm(value);
    setFormData(prev => ({ ...prev, companyName: value }));
  };

  const handleOrgSelect = (orgName: string) => {
    // Find the selected organization from the filtered results
    const selectedOrg = orgFilteredResults.find(org => org.name === orgName);
    
    if (selectedOrg) {
      setSelectedOrganization(selectedOrg);
      // Force country to Qatar
      const countryName = 'Qatar';
      const cityName = selectedOrg.city || '';
      const websiteFromApi = selectedOrg.website_url || selectedOrg.source_url || '';

      // Update form data with organization info
      setFormData(prev => ({ 
        ...prev, 
        companyName: orgName,
        country: countryName,
        city: cityName,
        website: websiteFromApi || prev.website
      }));

      // Update country search term and selected state
      setSearchTerm(countryName);
      setSelected(countryName);
    } else {
      // Fallback if organization not found
      setFormData(prev => ({ ...prev, companyName: orgName }));
    }
    
    setOrgSearchTerm(orgName);
    setShowOrgDropdown(false);
    setOrgIsOther(false);
  };

  const handleOrgOther = () => {
    setOrgIsOther(true);
    setShowOrgDropdown(false);
    setFormData(prev => ({ ...prev, companyName: '', city: '' }));
    setOrgSearchTerm('');
    // Clear the filtered results since user chose "Other"
    setOrgFilteredResults([]);
  };

  const handleObjectiveToggle = (objectiveId: string) => {
    setObjectives(prev => {
      const existing = prev.find(obj => obj.id === objectiveId);
      if (existing) {
        return prev.map(obj =>
          obj.id === objectiveId ? { ...obj, selected: !obj.selected } : obj
        );
      }
      // If not existing (AI frameworks case), add it from companyData
      const framework = companyData?.applicable_compliance_frameworks?.value?.find((fw: any) => fw.id === objectiveId);
      if (framework) {
        const newObjective: ComplianceObjective = {
          id: framework.id,
          name: framework.name,
          deadline: '',
          priority: 'medium',
          selected: true,
        };
        return [...prev, newObjective];
      }
      return prev;
    });
  };

  const handleObjectiveEdit = (objectiveId: string) => {
    setEditingObjective(objectiveId);
  };

  const handleObjectiveDelete = (objectiveId: string) => {
    setObjectives(prev => prev.filter(obj => obj.id !== objectiveId));
  };

  const handleObjectiveUpdate = (objectiveId: string, updatedData: Partial<ComplianceObjective>) => {
    setObjectives(prev => 
      prev.map(obj => 
        obj.id === objectiveId ? { ...obj, ...updatedData } : obj
      )
    );
    setEditingObjective(null);
  };

  const handleAddObjective = () => {
    if (!newObjective.name.trim()) {
      return;
    }
    
    const newId = crypto.randomUUID();
    const objective: ComplianceObjective = {
      id: newId,
      name: newObjective.name,
      deadline: newObjective.deadline,
      priority: newObjective.priority,
      selected: true
    };
    
    setObjectives(prev => [...prev, objective]);
    setNewObjective({ name: '', deadline: '', priority: 'medium', description: '' });
    setShowAddObjective(false);
  };

  // Functions for editing AI data
  const [editingValue, setEditingValue] = useState<string>('');

  const handleDataEdit = (fieldPath: string) => {
    setEditingData(fieldPath);
    // Set initial value for editing
    const currentValue = editableCompanyData || companyData;
    const path = fieldPath.split('.');
    let value = currentValue;
    
    for (const key of path) {
      value = value?.[key];
    }
    
    if (Array.isArray(value)) {
      setEditingValue(value.join(', '));
    } else {
      setEditingValue(value || '');
    }
  };

  const handleDataInputChange = (value: string) => {
    setEditingValue(value);
  };

  const handleDataSave = (fieldPath: string) => {
    setEditableCompanyData(prev => {
      const newData = { ...prev };
      const path = fieldPath.split('.');
      let current = newData;
      
      for (let i = 0; i < path.length - 1; i++) {
        if (!current[path[i]]) {
          current[path[i]] = {};
        }
        current = current[path[i]];
      }
      
      // Handle array values (comma-separated)
      if (fieldPath.includes('value') && (fieldPath.includes('services') || fieldPath.includes('sectors'))) {
        current[path[path.length - 1]] = editingValue.split(',').map(s => s.trim()).filter(s => s);
      } else {
        current[path[path.length - 1]] = editingValue;
      }
      
      return newData;
    });
    setEditingData(null);
    setEditingValue('');
  };

  const handleDataCancel = () => {
    setEditingData(null);
    setEditingValue('');
  };

  const getFrameworksToSend = () => {
    return objectives
      .filter(obj => obj.selected)
      .map(obj => ({
        id: obj.id,
        name: obj.name,
        deadline: obj.deadline,
        priority: obj.priority
      }));
  };

  const handleSubmit = async () => {
    // Validation
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).filter(k => validationErrors[k]).length > 0) {
      setErrors(validationErrors);
      toast.error('Please fix errors before submitting');
      return;
    }

    // Check if organization is found in API results (including all results, not just filtered)
    const orgFound = orgAllResults.some(
      org => org.name && org.name.toLowerCase() === formData.companyName.trim().toLowerCase()
    );

    console.log('Organization search results:', {
      searchedName: formData.companyName,
      allResults: orgAllResults,
      orgFound: orgFound
    });

    if (!orgFound) {
      // Organization not found in API: show verification modal
      setIsSubmitting(true);
      try {
        if (!token) throw new Error('Registration token not found.');
        const payload = {
          tenantName: formData.companyName,
          country: formData.country,
          website: formData.website,
          isRegister: false
        };
        const orgRes = await submitOrganizationInfo(token, payload);
        if (!orgRes?.isSuccess) throw new Error(orgRes?.message || 'Failed to submit organization info');
        setShowVerifyModal(true);
      } catch (err: any) {
        toast.error(err.message || 'Error in registration flow');
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    // Organization found in API: proceed with AI analysis and continue to next step
    setIsSubmitting(true);
    setStep('loading');
    try {
      if (!token) throw new Error('Registration token not found.');
      
      // 1. Get info from AI and flatten
      // Send the selected organization object as user_data if available
      const aiInput = selectedOrganization ? selectedOrganization : formData;
      const infoRes = await getInformationUserRegister(aiInput);
      if (!infoRes || !infoRes.success) throw new Error(infoRes?.message || 'AI info API failed');
      
      // Handle response - it might be an array or a single object
      let companyDataRaw = infoRes.companyData;
      if (Array.isArray(companyDataRaw) && companyDataRaw.length > 0) {
        companyDataRaw = companyDataRaw[0];
      }
      
      const companyDataToUse = flattenCompanyData(companyDataRaw);
      setCompanyData(companyDataToUse);
      setEditableCompanyData(companyDataToUse);

      // Initialize/merge Compliance Objectives from AI frameworks
      try {
        const aiFrameworks: any[] = Array.isArray(companyDataToUse?.applicable_compliance_frameworks?.value)
          ? companyDataToUse.applicable_compliance_frameworks.value
          : [];

        if (aiFrameworks.length > 0) {
          setObjectives(prev => {
            const existingById = new Map(prev.map(o => [o.id, o]));
            const merged: ComplianceObjective[] = [];

            // Include all AI frameworks, preserving existing selections if present
            for (const fw of aiFrameworks) {
              const existing = existingById.get(fw.id);
              merged.push({
                id: fw.id,
                name: fw.name,
                deadline: existing?.deadline || '',
                priority: existing?.priority || 'medium',
                selected: existing?.selected ?? false,
              });
              existingById.delete(fw.id);
            }

            // Keep any remaining custom objectives the user added manually
            for (const leftover of existingById.values()) {
              merged.push(leftover);
            }

            return merged;
          });
        }
      } catch {}

      // 2. Continue to business objectives step
      setOrganizationProfile({
        name: companyDataToUse.organization_name?.value || formData.companyName,
        country: companyDataToUse.headquarters_country?.value || formData.country,
        website: formData.website,
        entityType: companyDataToUse.entity_type?.value || 'Credit Institution',
        size: companyDataToUse.company_size?.value?.employees ? 'Medium (500-2000 employees)' : 'Unknown',
        services: companyDataToUse.key_services?.value || [],
        recentActivity: (companyDataToUse.recent_press?.value || []).map((press: any) => press.title).join(', ') || ''
      });
      setOriginalFormData(formData);
      setHasAnalyzed(true);
      
      // Show review card first, then user can proceed to business objectives
      setStep('review');
      
      // Keep current step as organization_info so review card shows
      // User will click "Continue to Business Objectives" to proceed
    } catch (err: any) {
      toast.error(err.message || 'Error in registration flow');
      setStep('input');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handler for business objectives step - move to compliance objectives
  const handleBusinessObjectivesNext = async () => {
    if (selectedBusinessObjectives.size === 0) {
      toast.error('Please select at least one business objective');
      return;
    }
    
    // Save business objectives selection to context
    const selectedBusinessObjs = (companyData?.business_objectives?.value || [])
      .filter((obj: any) => selectedBusinessObjectives.has(obj.id))
      .map((obj: any) => ({
        id: obj.id,
        name: obj.name,
        description: obj.description,
        priority: obj.priority,
        drivers: obj.drivers || [],
        risk_implications: obj.risk_implications || [],
        applicable_compliance_frameworks: obj.applicable_compliance_frameworks || []
      }));
    
    setUserData({
      organizationInfo: {
        ...userData.organizationInfo,
        selectedBusinessObjectives: selectedBusinessObjs
      }
    });
    
    // If organization data already exists in database, save the update
    if (userData.organizationInfo?.companyData) {
      try {
        const tenantName = formData.companyName || 
                          companyData?.organization_name?.value || 
                          userData.organizationInfo?.tenantName || 
                          '';
        const country = formData.country || 
                       companyData?.headquarters_country?.value || 
                       userData.organizationInfo?.country || 
                       '';
        const website = formData.website || 
                       companyData?.contact_information?.website?.value || 
                       userData.organizationInfo?.website || 
                       '';

        const companyDataToSave = { ...(editableCompanyData || companyData) };
        companyDataToSave.businessObjectives = selectedBusinessObjs;
        
        // Filter business objectives in the original structure
        if (companyDataToSave.business_objectives?.value) {
          companyDataToSave.business_objectives = {
            ...companyDataToSave.business_objectives,
            value: companyDataToSave.business_objectives.value.filter((obj: any) => 
              selectedBusinessObjectives.has(obj.id)
            )
          };
        }

        const payload: Parameters<typeof submitOrganizationInfo>[1] = {
          tenantName: tenantName,
          country: country,
          website: website,
          companyData: [companyDataToSave]
        };
        
        await submitOrganizationInfo(token, payload);
      } catch (err: any) {
        console.error('Failed to save business objectives update:', err);
        // Don't block navigation, just log the error
      }
    }
    
    goToStep('compliance_objectives', true);
  };

  // Handler for compliance objectives step - save and go to assessment
  const handleComplianceObjectivesNext = async () => {
    try {
      if (!token) throw new Error('Registration token not found.');

      if (selectedComplianceFrameworks.size === 0) {
        toast.error('Please select at least one compliance framework');
        return;
      }

      // Prepare company data with all agent data, but filter business objectives and compliance frameworks
      const companyDataToSave = { ...(editableCompanyData || companyData) };
      
      // Filter business objectives to only include selected ones
      const selectedBusinessObjs = (companyData?.business_objectives?.value || [])
        .filter((obj: any) => selectedBusinessObjectives.has(obj.id))
        .map((obj: any) => ({
          id: obj.id,
          name: obj.name,
          description: obj.description,
          priority: obj.priority,
          drivers: obj.drivers || [],
          risk_implications: obj.risk_implications || [],
          applicable_compliance_frameworks: obj.applicable_compliance_frameworks || []
        }));

      // Filter compliance frameworks to only include selected ones
      const selectedComplianceFws = (companyData?.applicable_compliance_frameworks?.value || [])
        .filter((fw: any) => selectedComplianceFrameworks.has(fw.id))
        .map((fw: any) => ({
          id: fw.id,
          name: fw.name,
          reason: fw.reason
        }));

      // Add businessObjectives and complianceFrameworks inside companyData
      companyDataToSave.businessObjectives = selectedBusinessObjs;
      companyDataToSave.complianceFrameworks = selectedComplianceFws;

      // Also update the original structure to reflect filtered values
      if (companyDataToSave.business_objectives?.value) {
        companyDataToSave.business_objectives = {
          ...companyDataToSave.business_objectives,
          value: companyDataToSave.business_objectives.value.filter((obj: any) => 
            selectedBusinessObjectives.has(obj.id)
          )
        };
      }

      if (companyDataToSave.applicable_compliance_frameworks?.value) {
        companyDataToSave.applicable_compliance_frameworks = {
          ...companyDataToSave.applicable_compliance_frameworks,
          value: companyDataToSave.applicable_compliance_frameworks.value.filter((fw: any) => 
            selectedComplianceFrameworks.has(fw.id)
          )
        };
      }

      // 1. Submit organization info with AI data (all data included, with businessObjectives and complianceFrameworks inside companyData)
      // Get values from formData, companyData, or userData (in that order of preference)
      const tenantName = formData.companyName || 
                        companyData?.organization_name?.value || 
                        userData.organizationInfo?.tenantName || 
                        '';
      const country = formData.country || 
                     companyData?.headquarters_country?.value || 
                     userData.organizationInfo?.country || 
                     '';
      const website = formData.website || 
                     companyData?.contact_information?.website?.value || 
                     userData.organizationInfo?.website || 
                     '';

      const payload: Parameters<typeof submitOrganizationInfo>[1] = {
        tenantName: tenantName,
        country: country,
        website: website,
        companyData: [companyDataToSave]
      };
      const orgRes = await submitOrganizationInfo(token, payload);
      if (!orgRes || !orgRes.isSuccess) throw new Error(orgRes?.message || 'Failed to submit organization info');

      // 2. Store selected objectives and company data in context
      setUserData({
        organizationInfo: {
          ...userData.organizationInfo,
          selectedBusinessObjectives: selectedBusinessObjs,
          selectedComplianceFrameworks: selectedComplianceFws,
          companyData: companyDataToSave
        }
      });

      // 3. Check registration status
      const statusRes = await getRegistrationStatus(token);
      if (!statusRes || !statusRes.isSuccess) throw new Error(statusRes?.message || 'Failed to get registration status');
      
      // Get the new token and updated step from the API response
      const newToken = statusRes.data?.token;
      const updatedStep = statusRes.data?.step;
      
      if (newToken) {
        localStorage.setItem("token", newToken);
      }

      // Update context with the new step
      if (updatedStep) {
        setCurrentStep(updatedStep as any);
      }

      // 4. Navigate to assessment (backend should return 'completed' or 'organization_info' after saving)
      goToStep('completed', true);
    } catch (err: any) {
      toast.error(err.message || 'Failed to proceed to next step');
    }
  };

  const runAiStepSequence = async (steps: AgentStep[]) => {
    // Process each step one by one with visual updates
    for (let i = 0; i < steps.length; i++) {
      // Set current step to processing
      setAgentSteps(prev => prev.map((step, index) => {
        if (index === i) {
          return { ...step, status: 'processing' };
        }
        return step;
      }));

      // Wait for processing time
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Set current step to completed
      setAgentSteps(prev => prev.map((step, index) => {
        if (index === i) {
          return { ...step, status: 'completed' };
        }
        return step;
      }));

      // Small delay between steps
      if (i < steps.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }
  };

  const handlePrevious = () => {
    prevStep();
  };

  // Show loading state while restoring
  if (isRestoring) {
    return null; // Let StepperLayout handle the loading state
  }

  // Determine which step to show based on currentStep from context
  const isOrganizationStep = currentStep === 'organization_info' || currentStep === 'personal_info';
  const isBusinessObjectivesStep = currentStep === 'business_objectives';
  const isComplianceObjectivesStep = currentStep === 'compliance_objectives';

  // Show loading screen only if we're on organization step and in loading state (landing theme, no navbar)
  if (isOrganizationStep && step === 'loading') {
    return (
      <div className="min-h-screen bg-background relative">
        <div className="fixed inset-0 pointer-events-none z-0">
          <ParticleField className="absolute inset-0 w-full h-full" particleCount={40} color="green" />
        </div>
        <div className="relative z-10 pt-10 px-4 sm:px-6 py-8">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-6">
              <Loader2 className="w-14 h-14 text-accent animate-spin mx-auto mb-3" />
              <h2 className="text-xl font-bold text-foreground mb-1.5">
                Fetching public signals… building a compliance profile.
              </h2>
              <p className="text-muted-foreground text-sm mb-3">
                AI Scout Agent analyzing {formData.companyName}
              </p>
              <div className="w-full bg-muted rounded-full h-1.5 mb-3">
                <div
                  className="bg-accent h-1.5 rounded-full transition-all duration-500 ease-out"
                  style={{
                    width: `${(agentSteps.filter(s => s.status === 'completed').length / agentSteps.length) * 100}%`
                  }}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                {agentSteps.filter(s => s.status === 'completed').length} of {agentSteps.length} steps completed
              </p>
            </div>

            <Card className="glass border border-border overflow-hidden">
              <CardHeader className="px-4 py-3 border-b border-border">
                <CardTitle className="text-base font-semibold text-foreground flex items-center gap-2">
                  <Database className="w-4 h-4 text-accent shrink-0" />
                  AI Agent Reasoning - Transparent Process
                </CardTitle>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Watch our AI agents fetch data from official trusted sources
                </p>
              </CardHeader>
              <CardContent className="p-3 space-y-2.5">
                {agentSteps.map((s) => (
                  <div key={s.id} className="flex items-start gap-3 p-3 border border-border rounded-lg bg-background/50">
                    <div className="flex-shrink-0 mt-0.5">
                      {s.status === 'completed' && <CheckCircle className="h-4 w-4 text-accent" />}
                      {s.status === 'processing' && <Loader2 className="h-4 w-4 text-accent animate-spin" />}
                      {s.status === 'pending' && <Clock className="h-4 w-4 text-muted-foreground" />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        {s.icon}
                        <h3 className="font-medium text-foreground text-sm">{s.title}</h3>
                        {s.status === 'processing' && (
                          <Badge className="bg-accent/20 text-accent border-accent/30 text-xs">Active</Badge>
                        )}
                        {s.status === 'completed' && (
                          <Badge className="bg-accent/20 text-accent border-accent/30 text-xs">Complete</Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">{s.description}</p>
                      {s.source && (
                        <p className="text-[10px] text-muted-foreground mt-1">
                          <strong>Sources:</strong> {s.source}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <p className="mt-4 text-center text-xs text-muted-foreground">
              All data is sourced from official registers and publicly available information
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Organization step - show input form
  if (isOrganizationStep && step === 'input') {
    return (
      <StepperLayout
        variant="landing"
        showHeader={false}
        title="Tell Us About Your Organization"
        description="Help us build your personalized compliance profile in under 60 seconds"
        onNext={handleSubmit}
        onPrevious={handlePrevious}
        nextLabel="Analyze Organization"
        previousLabel="Back"
        isNextDisabled={!formData.companyName || !formData.country || !formData.website}
        isNextLoading={isSubmitting}
      >
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="companyName" className="text-sm font-medium text-foreground">
              Company Name *
            </Label>
            <div className="relative org-dropdown-container">
              <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="companyName"
                type="text"
                placeholder="e.g., European Central Bank"
                value={orgSearchTerm}
                onChange={e => handleOrgInputChange(e.target.value)}
                onFocus={() => setShowOrgDropdown(true)}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    if (orgSearchTerm.trim().length >= 2) {
                      handleSearch(orgSearchTerm);
                    }
                  }
                }}
                className={`pl-10 h-12 bg-background/80 border-border text-foreground placeholder:text-muted-foreground focus:border-accent ${errors.companyName ? 'border-destructive' : ''}`}
                disabled={orgIsOther ? false : false}
                autoComplete="off"
              />

              {/* Dropdown for organization suggestions */}
              {showOrgDropdown && !orgIsOther && (
                <div className="absolute top-full left-0 w-full bg-card border border-border rounded shadow-lg max-h-60 overflow-y-auto z-50 text-foreground">
                  {orgSearchLoading && (
                    <div className="px-4 py-2 text-muted-foreground flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Searching organizations...
                    </div>
                  )}
                  {!orgSearchLoading && orgFilteredResults.length === 0 && orgSearchTerm.trim().length >= 2 && (
                    <div className="px-4 py-2 text-muted-foreground">No organizations found</div>
                  )}
                  {!orgSearchLoading && orgFilteredResults.length === 0 && orgSearchTerm.trim().length < 2 && orgSearchTerm.trim().length > 0 && (
                    <div className="px-4 py-2 text-muted-foreground">Type at least 2 characters to search</div>
                  )}
                  {orgFilteredResults.map(org => (
                    <div
                      key={org.id}
                      className="px-4 py-2 hover:bg-muted cursor-pointer flex items-center gap-2"
                      onClick={() => handleOrgSelect(org.name)}
                    >
                      <span>{org.name}</span>
                    </div>
                  ))}
                  <div
                    className="px-4 py-2 hover:bg-muted cursor-pointer text-accent border-t border-border"
                    onClick={handleOrgOther}
                  >
                    Other
                  </div>
                </div>
              )}
            </div>
            {errors.companyName && (
              <p className="text-sm text-destructive">{errors.companyName}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="country" className="text-sm font-medium text-foreground">
              Headquarters Country *
            </Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search for a country..."
                className={`w-full pl-10 pr-4 h-12 bg-background/80 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent rounded ${
                  errors.country ? 'border-destructive' : ''
                }`}
                onFocus={() => setShowDropdown(true)}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setShowDropdown(true);
                }}
                value={searchTerm}
              />

              {showDropdown && (
                <div className="absolute top-full left-0 w-full bg-card border border-border rounded shadow-lg max-h-60 overflow-y-auto z-50 text-foreground">
                  {euCountries
                    .filter((country) =>
                      country.name.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((country) => (
                      <div
                        key={country.name}
                        className="px-4 py-2 hover:bg-muted cursor-pointer flex items-center gap-2"
                        onClick={() => {
                          setSelected(country.name);
                          setSearchTerm(country.name);
                          handleInputChange("country", country.name);
                          setShowDropdown(false);
                        }}
                      >
                        <ReactCountryFlag
                          countryCode={country.code}
                          svg
                          style={{
                            width: "20px",
                            height: "15px",
                            marginRight: "8px",
                          }}
                          title={country.name}
                        />
                        <span>{country.name}</span>
                      </div>
                    ))}
                </div>
              )}
            </div>
            {errors.country && (
              <p className="text-sm text-destructive">{errors.country}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="website" className="text-sm font-medium text-foreground">
              Website *
            </Label>
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="website"
                type="url"
                placeholder="https://www.yourcompany.com"
                value={formData.website}
                onChange={(e) => handleInputChange('website', e.target.value)}
                className={`pl-10 h-12 bg-background/80 border-border text-foreground placeholder:text-muted-foreground focus:border-accent ${
                  errors.website ? 'border-destructive' : ''
                }`}
              />
            </div>
            {errors.website && (
              <p className="text-sm text-destructive">{errors.website}</p>
            )}
          </div>
        </div>
        {showVerifyModal && (
          <OrganizationVerificationModal
            isOpen={showVerifyModal}
            onClose={() => {
              setShowVerifyModal(false);
              // After verification modal is closed, proceed to next step
              nextStep();
            }}
            organizationName={formData.companyName}
          />
        )}
      </StepperLayout>
    );
  }

  // Business Objectives Step
  if (isBusinessObjectivesStep) {
    const businessObjectives = companyData?.business_objectives?.value || [];
    
    return (
      <StepperLayout
        variant="landing"
        showHeader={false}
        title="Select Business Objectives"
        description="Select the business objectives that apply to your organization"
        onNext={handleBusinessObjectivesNext}
        onPrevious={() => {
          goToStep('organization_info');
          if (hasAnalyzed) {
            setStep('review');
          }
        }}
        nextLabel="Continue"
        previousLabel="Back"
        isNextDisabled={selectedBusinessObjectives.size === 0}
      >
        <div className="rounded-xl border border-border overflow-hidden bg-background/40 flex-1 flex flex-col min-h-0">
          <div className="px-4 py-3 border-b border-border bg-muted/20 shrink-0">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/20">
                  <Target className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-foreground">Business Objectives</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {selectedBusinessObjectives.size} of {businessObjectives.length} selected
                  </p>
                </div>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  const allSelected = businessObjectives.every((obj: any) => selectedBusinessObjectives.has(obj.id));
                  if (allSelected) {
                    setSelectedBusinessObjectives(new Set());
                  } else {
                    setSelectedBusinessObjectives(new Set(businessObjectives.map((obj: any) => obj.id)));
                  }
                }}
                className="shrink-0 border-accent/50 text-accent hover:bg-accent/10 hover:text-accent"
              >
                {businessObjectives.every((obj: any) => selectedBusinessObjectives.has(obj.id)) ? 'Deselect All' : 'Select All'}
              </Button>
            </div>
          </div>

          <div className="p-3 flex-1 min-h-0 overflow-y-auto">
            {businessObjectives.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {businessObjectives.map((objective: any) => {
                const isSelected = selectedBusinessObjectives.has(objective.id);
                return (
                  <label
                    key={objective.id}
                    htmlFor={`business-${objective.id}`}
                    className={`flex cursor-pointer gap-3 rounded-lg border-2 p-3 transition-all duration-200 ${
                      isSelected
                        ? 'border-accent bg-accent/10 shadow-sm'
                        : 'border-border bg-muted/20 hover:border-accent/50 hover:bg-accent/5'
                    }`}
                  >
                    <div className="flex h-5 w-5 shrink-0 items-center pt-0.5">
                      <Checkbox
                        id={`business-${objective.id}`}
                        checked={isSelected}
                        onCheckedChange={() => {
                          setSelectedBusinessObjectives(prev => {
                            const newSet = new Set(prev);
                            if (newSet.has(objective.id)) newSet.delete(objective.id);
                            else newSet.add(objective.id);
                            return newSet;
                          });
                        }}
                        className="h-4 w-4 data-[state=checked]:bg-accent data-[state=checked]:border-accent"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="font-semibold text-foreground text-sm">{objective.name}</span>
                        <Badge
                          variant={objective.priority === 'high' ? 'destructive' : 'secondary'}
                          className={
                            objective.priority === 'high'
                              ? 'bg-destructive/20 text-destructive text-xs'
                              : 'bg-muted text-muted-foreground text-xs'
                          }
                        >
                          {objective.priority}
                        </Badge>
                        {isSelected && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-accent/20 px-2 py-0.5 text-xs font-medium text-accent">
                            <CheckCircle className="h-3 w-3" />
                            Selected
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">{objective.description}</p>

                      {(objective.drivers?.length > 0 || objective.risk_implications?.length > 0 || objective.applicable_compliance_frameworks?.length > 0) && (
                        <div className="mt-2 space-y-2 rounded-lg bg-background/50 border border-border p-2.5 text-xs">
                          {objective.drivers?.length > 0 && (
                            <div>
                              <p className="font-medium text-muted-foreground mb-0.5">Drivers</p>
                              <ul className="list-disc list-inside space-y-0.5 text-muted-foreground">
                                {objective.drivers.map((driver: string, idx: number) => (
                                  <li key={idx}>{driver}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {objective.risk_implications?.length > 0 && (
                            <div>
                              <p className="font-medium text-muted-foreground mb-0.5">Risk implications</p>
                              <ul className="list-disc list-inside space-y-0.5 text-muted-foreground">
                                {objective.risk_implications.map((risk: string, idx: number) => (
                                  <li key={idx}>{risk}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {objective.applicable_compliance_frameworks?.length > 0 && (
                            <div>
                              <p className="font-medium text-muted-foreground mb-0.5">Applicable frameworks</p>
                              <div className="space-y-1">
                                {objective.applicable_compliance_frameworks.map((fw: any, idx: number) => {
                                  const label = fw.name || fw.alignment_reason || 'Applicable framework';
                                  return (
                                    <div key={idx} className="flex gap-2">
                                      <CheckCircle className="h-3 w-3 shrink-0 text-accent mt-0.5" />
                                      <div>
                                        <span className="font-medium text-foreground">{label}</span>
                                        {fw.alignment_reason && fw.name && (
                                          <span className="text-muted-foreground"> — {fw.alignment_reason}</span>
                                        )}
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </label>
                );
              })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-muted/20 py-8 text-center">
                <Target className="h-10 w-10 text-muted-foreground mb-2" />
                <p className="text-sm font-medium text-foreground">No business objectives found</p>
                <p className="text-xs text-muted-foreground mt-0.5">Complete the organization step first to see objectives.</p>
              </div>
            )}
          </div>
        </div>
      </StepperLayout>
    );
  }

  // Compliance Objectives Step
  if (isComplianceObjectivesStep) {
    // Always show all compliance frameworks for selection, but filter when sending to backend
    const complianceFrameworks = companyData?.applicable_compliance_frameworks?.value || [];
    
    return (
      <StepperLayout
        variant="landing"
        showHeader={false}
        title="Select Compliance Frameworks"
        description="Select the compliance frameworks that apply to your organization"
        onNext={handleComplianceObjectivesNext}
        onPrevious={() => goToStep('business_objectives')}
        nextLabel="Confirm & Continue"
        previousLabel="Back"
        isNextDisabled={selectedComplianceFrameworks.size === 0}
      >
        <Card className="border border-border bg-card/50 shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-bold text-foreground">
                Compliance Frameworks
              </CardTitle>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  const allSelected = complianceFrameworks.every((fw: any) => selectedComplianceFrameworks.has(fw.id));
                  if (allSelected) {
                    setSelectedComplianceFrameworks(new Set());
                  } else {
                    setSelectedComplianceFrameworks(new Set(complianceFrameworks.map((fw: any) => fw.id)));
                  }
                }}
                className="text-accent border-accent hover:bg-accent hover:text-background"
              >
                {complianceFrameworks.every((fw: any) => selectedComplianceFrameworks.has(fw.id)) ? 'Deselect All' : 'Select All'}
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Select one or more compliance frameworks that are relevant to your organization
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {complianceFrameworks.length > 0 ? (
              complianceFrameworks.map((framework: any) => {
                const isSelected = selectedComplianceFrameworks.has(framework.id);
                return (
                  <div 
                    key={framework.id} 
                    className={`p-4 border rounded-lg transition-all duration-200 ${
                      isSelected 
                        ? 'border-accent bg-accent/10' 
                        : 'border-border hover:border-accent/50 hover:bg-muted/30'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id={`compliance-${framework.id}`}
                        checked={isSelected}
                        onCheckedChange={async () => {
                          const newSet = new Set(selectedComplianceFrameworks);
                          if (newSet.has(framework.id)) {
                            newSet.delete(framework.id);
                          } else {
                            newSet.add(framework.id);
                          }
                          setSelectedComplianceFrameworks(newSet);
                          
                          // If organization data already exists in database, save the update
                          if (userData.organizationInfo?.companyData && token) {
                            try {
                              const selectedComplianceFws = (companyData?.applicable_compliance_frameworks?.value || [])
                                .filter((fw: any) => newSet.has(fw.id))
                                .map((fw: any) => ({
                                  id: fw.id,
                                  name: fw.name,
                                  reason: fw.reason
                                }));

                              const companyDataToSave = { ...(editableCompanyData || companyData) };
                              companyDataToSave.complianceFrameworks = selectedComplianceFws;
                              
                              // Filter compliance frameworks in the original structure
                              if (companyDataToSave.applicable_compliance_frameworks?.value) {
                                companyDataToSave.applicable_compliance_frameworks = {
                                  ...companyDataToSave.applicable_compliance_frameworks,
                                  value: companyDataToSave.applicable_compliance_frameworks.value.filter((fw: any) => 
                                    newSet.has(fw.id)
                                  )
                                };
                              }

                              const tenantName = formData.companyName || 
                                                companyData?.organization_name?.value || 
                                                userData.organizationInfo?.tenantName || 
                                                '';
                              const country = formData.country || 
                                             companyData?.headquarters_country?.value || 
                                             userData.organizationInfo?.country || 
                                             '';
                              const website = formData.website || 
                                             companyData?.contact_information?.website?.value || 
                                             userData.organizationInfo?.website || 
                                             '';

                              const selectedBusinessObjs = (companyData?.business_objectives?.value || [])
                                .filter((obj: any) => selectedBusinessObjectives.has(obj.id))
                                .map((obj: any) => ({
                                  id: obj.id,
                                  name: obj.name,
                                  description: obj.description,
                                  priority: obj.priority,
                                  drivers: obj.drivers || [],
                                  risk_implications: obj.risk_implications || [],
                                  applicable_compliance_frameworks: obj.applicable_compliance_frameworks || []
                                }));

                              companyDataToSave.businessObjectives = selectedBusinessObjs;
                              
                              if (companyDataToSave.business_objectives?.value) {
                                companyDataToSave.business_objectives = {
                                  ...companyDataToSave.business_objectives,
                                  value: companyDataToSave.business_objectives.value.filter((obj: any) => 
                                    selectedBusinessObjectives.has(obj.id)
                                  )
                                };
                              }

                              const payload: Parameters<typeof submitOrganizationInfo>[1] = {
                                tenantName: tenantName,
                                country: country,
                                website: website,
                                companyData: [companyDataToSave]
                              };
                              
                              await submitOrganizationInfo(token, payload);
                              
                              // Update context with new selections
                              setUserData({
                                organizationInfo: {
                                  ...userData.organizationInfo,
                                  selectedComplianceFrameworks: selectedComplianceFws,
                                  companyData: companyDataToSave
                                }
                              });
                            } catch (err: any) {
                              console.error('Failed to save compliance frameworks update:', err);
                              // Don't block UI, just log the error
                            }
                          }
                        }}
                        className="data-[state=checked]:bg-accent data-[state=checked]:border-accent"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <Label htmlFor={`compliance-${framework.id}`} className="text-base font-semibold text-foreground cursor-pointer">
                              {framework.name}
                            </Label>
                            <Badge 
                              variant="outline" 
                              className="bg-accent/20 text-accent border-accent/30 text-xs"
                            >
                              Applicable
                            </Badge>
                          </div>
                          {isSelected && (
                            <div className="flex items-center space-x-1 text-accent">
                              <CheckCircle className="w-4 h-4" />
                              <span className="text-sm font-medium">Selected</span>
                            </div>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{framework.reason}</p>
                        {companyData?.applicable_compliance_frameworks?.source?.length > 0 && (
                          <div className="mt-2 flex items-center space-x-1 text-xs text-muted-foreground">
                            <Link className="w-3 h-3" />
                            <span>{companyData.applicable_compliance_frameworks.source.length} source(s)</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <p>No compliance frameworks found. Please complete the organization step first.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </StepperLayout>
    );
  }

  // Review step - show organization review card after organization is analyzed
  if (isOrganizationStep && step === 'review' && !isBusinessObjectivesStep && !isComplianceObjectivesStep) {
    return (
      <StepperLayout
        variant="landing"
        showHeader={false}
        title="Review Your Organization Profile"
        description="Please review the information we've gathered"
        onNext={() => goToStep('business_objectives', true)}
        onPrevious={() => setStep('input')}
        nextLabel="Continue to Business Objectives"
        previousLabel="Edit Information"
        className="review-step-layout"
      >
        <div className="w-full space-y-6">
          {/* Comprehensive AI Data Display */}
          <Card className="glass border border-border rounded-xl shadow-lg relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-accent rounded-t-xl"></div>
            <CardHeader className="border-b border-border pb-4 pt-6 bg-background/30">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-accent/20 rounded-lg">
                  <Database className="w-5 h-5 text-accent" />
                </div>
                <CardTitle className="text-lg font-semibold text-foreground">
                  AI Analysis Results
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6 bg-background/20">
              
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Organization Name */}
                <div className="bg-background/50 border border-border rounded-lg p-4 hover:border-accent/50 hover:shadow-md transition-all duration-200">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-accent/20 rounded-lg">
                        <Building2 className="w-4 h-4 text-accent" />
                      </div>
                      <h4 className="text-sm font-semibold text-foreground">Organization Name</h4>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDataEdit('organization_name.value')}
                      className="h-6 w-6 p-0 text-muted-foreground hover:text-accent"
                    >
                      <Edit className="w-3 h-3" />
                    </Button>
                  </div>
                  {editingData === 'organization_name.value' ? (
                    <div className="space-y-2">
                      <Input
                        value={editingValue}
                        onChange={(e) => handleDataInputChange(e.target.value)}
                        className="h-8 text-sm bg-background/80 border-border text-foreground"
                        placeholder="Enter organization name"
                      />
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          onClick={() => handleDataSave('organization_name.value')}
                          className="btn-gradient text-white text-xs"
                        >
                          Save
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleDataCancel}
                          className="text-xs border-border"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <p className="text-sm text-foreground mb-2">
                        {editableCompanyData?.organization_name?.value || companyData?.organization_name?.value || <span className="text-muted-foreground italic">Not specified</span>}
                      </p>
                      {(editableCompanyData?.organization_name?.source || companyData?.organization_name?.source)?.length > 0 && (
                        <div className="space-y-2">
                          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                            <Link className="w-3 h-3" />
                            <span>{(editableCompanyData?.organization_name?.source || companyData?.organization_name?.source).length} source(s)</span>
                          </div>
                          <div className="space-y-1">
                            {(editableCompanyData?.organization_name?.source || companyData?.organization_name?.source).map((source: string, index: number) => (
                              <div key={index} className="flex items-center space-x-2 text-xs">
                                <ExternalLink className="w-3 h-3 text-accent" />
                                <a 
                                  href={source} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-accent hover:text-accent/80 underline truncate"
                                  title={source}
                                >
                                  {source.length > 40 ? source.substring(0, 40) + '...' : source}
                                </a>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>

                {/* Institution ID */}
                <div className="bg-background/40 border border-border rounded-lg p-4 hover:border-accent/50 hover:shadow-md transition-all duration-200 glass">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="p-2 bg-accent/20 rounded-lg">
                      <FileText className="w-4 h-4 text-accent" />
                    </div>
                    <h4 className="text-sm font-semibold text-foreground">Institution ID</h4>
                  </div>
                  <p className="text-sm text-foreground mb-2">
                    {companyData?.institution_id?.value || <span className="text-muted-foreground italic">Not specified</span>}
                  </p>
                  {companyData?.institution_id?.source?.length > 0 && (
                    <div className="space-y-2">
                      <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                        <Link className="w-3 h-3" />
                        <span>{companyData.institution_id.source.length} source(s)</span>
                      </div>
                      <div className="space-y-1">
                        {companyData.institution_id.source.map((source: string, index: number) => (
                          <div key={index} className="flex items-center space-x-2 text-xs">
                            <ExternalLink className="w-3 h-3 text-accent" />
                            <a 
                              href={source} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-accent hover:text-accent/80 underline truncate"
                              title={source}
                            >
                              {source.length > 40 ? source.substring(0, 40) + '...' : source}
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Entity Type */}
                <div className="bg-background/40 border border-border rounded-lg p-4 hover:border-accent/50 hover:shadow-md transition-all duration-200 glass">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-accent/20 rounded-lg">
                        <Shield className="w-4 h-4 text-accent" />
                      </div>
                      <h4 className="text-sm font-semibold text-foreground">Entity Type</h4>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDataEdit('entity_type.value')}
                      className="h-6 w-6 p-0 text-muted-foreground hover:text-accent"
                    >
                      <Edit className="w-3 h-3" />
                    </Button>
                  </div>
                  {editingData === 'entity_type.value' ? (
                    <div className="space-y-2">
                      <Input
                        value={editingValue}
                        onChange={(e) => handleDataInputChange(e.target.value)}
                        className="h-8 text-sm bg-background/80 border-border text-foreground"
                        placeholder="Enter entity type"
                      />
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          onClick={() => handleDataSave('entity_type.value')}
                          className="btn-gradient text-white text-xs"
                        >
                          Save
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleDataCancel}
                          className="text-xs border-border"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <p className="text-sm text-foreground mb-2">
                        {editableCompanyData?.entity_type?.value || companyData?.entity_type?.value || <span className="text-muted-foreground italic">Not specified</span>}
                      </p>
                      {(editableCompanyData?.entity_type?.source || companyData?.entity_type?.source)?.length > 0 && (
                        <div className="space-y-2">
                          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                            <Link className="w-3 h-3" />
                            <span>{(editableCompanyData?.entity_type?.source || companyData?.entity_type?.source).length} source(s)</span>
                          </div>
                          <div className="space-y-1">
                            {(editableCompanyData?.entity_type?.source || companyData?.entity_type?.source).map((source: string, index: number) => (
                              <div key={index} className="flex items-center space-x-2 text-xs">
                                <ExternalLink className="w-3 h-3 text-accent" />
                                <a 
                                  href={source} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-accent hover:text-accent/80 underline truncate"
                                  title={source}
                                >
                                  {source.length > 40 ? source.substring(0, 40) + '...' : source}
                                </a>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>

                {/* Headquarters Country */}
                <div className="bg-background/40 border border-border rounded-lg p-4 hover:border-accent/50 hover:shadow-md transition-all duration-200 glass">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-accent/20 rounded-lg">
                        <MapPin className="w-4 h-4 text-accent" />
                      </div>
                      <h4 className="text-sm font-semibold text-foreground">Headquarters</h4>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDataEdit('headquarters_country.value')}
                      className="h-6 w-6 p-0 text-muted-foreground hover:text-accent"
                    >
                      <Edit className="w-3 h-3" />
                    </Button>
                  </div>
                  {editingData === 'headquarters_country.value' ? (
                    <div className="space-y-2">
                      <Input
                        value={editingValue}
                        onChange={(e) => handleDataInputChange(e.target.value)}
                        className="h-8 text-sm bg-background/80 border-border text-foreground"
                        placeholder="Enter headquarters country"
                      />
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          onClick={() => handleDataSave('headquarters_country.value')}
                          className="btn-gradient text-white text-xs"
                        >
                          Save
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleDataCancel}
                          className="text-xs border-border"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center gap-2 mb-2">
                        {(editableCompanyData?.headquarters_country?.value || companyData?.headquarters_country?.value) && (
                          <ReactCountryFlag
                            countryCode={euCountries.find(c => c.name === (editableCompanyData?.headquarters_country?.value || companyData?.headquarters_country?.value))?.code || ''}
                            svg
                            style={{ width: '16px', height: '12px' }}
                            className="rounded"
                          />
                        )}
                        <p className="text-sm text-foreground">{editableCompanyData?.headquarters_country?.value || companyData?.headquarters_country?.value || <span className="text-muted-foreground italic">Not specified</span>}</p>
                      </div>
                      {(editableCompanyData?.headquarters_country?.source || companyData?.headquarters_country?.source)?.length > 0 && (
                        <div className="space-y-2">
                          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                            <Link className="w-3 h-3" />
                            <span>{(editableCompanyData?.headquarters_country?.source || companyData?.headquarters_country?.source).length} source(s)</span>
                          </div>
                          <div className="space-y-1">
                            {(editableCompanyData?.headquarters_country?.source || companyData?.headquarters_country?.source).map((source: string, index: number) => (
                              <div key={index} className="flex items-center space-x-2 text-xs">
                                <ExternalLink className="w-3 h-3 text-accent" />
                                <a 
                                  href={source} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-accent hover:text-accent/80 underline truncate"
                                  title={source}
                                >
                                  {source.length > 40 ? source.substring(0, 40) + '...' : source}
                                </a>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>

                {/* Industry Sectors */}
                <div className="bg-background/40 border border-border rounded-lg p-4 hover:border-accent/50 hover:shadow-md transition-all duration-200 glass">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-accent/20 rounded-lg">
                        <Target className="w-4 h-4 text-accent" />
                      </div>
                      <h4 className="text-sm font-semibold text-foreground">Industry Sectors</h4>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDataEdit('industry_sectors.value')}
                      className="h-6 w-6 p-0 text-muted-foreground hover:text-accent"
                    >
                      <Edit className="w-3 h-3" />
                    </Button>
                  </div>
                  {editingData === 'industry_sectors.value' ? (
                    <div className="space-y-2">
                      <Input
                        value={editingValue}
                        onChange={(e) => handleDataInputChange(e.target.value)}
                        className="h-8 text-sm bg-background/80 border-border text-foreground"
                        placeholder="Enter industry sectors (comma separated)"
                      />
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          onClick={() => handleDataSave('industry_sectors.value')}
                          className="btn-gradient text-white text-xs"
                        >
                          Save
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleDataCancel}
                          className="text-xs border-border"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <p className="text-sm text-foreground mb-2">
                        {(editableCompanyData?.industry_sectors?.value || companyData?.industry_sectors?.value || []).join(', ') || <span className="text-muted-foreground italic">Not specified</span>}
                      </p>
                      {(editableCompanyData?.industry_sectors?.source || companyData?.industry_sectors?.source)?.length > 0 && (
                        <div className="space-y-2">
                          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                            <Link className="w-3 h-3" />
                            <span>{(editableCompanyData?.industry_sectors?.source || companyData?.industry_sectors?.source).length} source(s)</span>
                          </div>
                          <div className="space-y-1">
                            {(editableCompanyData?.industry_sectors?.source || companyData?.industry_sectors?.source).map((source: string, index: number) => (
                              <div key={index} className="flex items-center space-x-2 text-xs">
                                <ExternalLink className="w-3 h-3 text-accent" />
                                <a 
                                  href={source} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-accent hover:text-accent/80 underline truncate"
                                  title={source}
                                >
                                  {source.length > 40 ? source.substring(0, 40) + '...' : source}
                                </a>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>

                {/* Company Size */}
                <div className="bg-background/40 border border-border rounded-lg p-4 hover:border-accent/50 hover:shadow-md transition-all duration-200 glass">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="p-2 bg-accent/20 rounded-lg">
                      <Users className="w-4 h-4 text-accent" />
                    </div>
                    <h4 className="text-sm font-semibold text-foreground">Company Size</h4>
                  </div>
                  <p className="text-sm text-foreground mb-2">
                    {companyData?.company_size?.value?.employees || <span className="text-muted-foreground italic">Not specified</span>}
                  </p>
                  {companyData?.company_size?.source?.length > 0 && (
                    <div className="space-y-2">
                      <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                        <Link className="w-3 h-3" />
                        <span>{companyData.company_size.source.length} source(s)</span>
                      </div>
                      <div className="space-y-1">
                        {companyData.company_size.source.map((source: string, index: number) => (
                          <div key={index} className="flex items-center space-x-2 text-xs">
                            <ExternalLink className="w-3 h-3 text-accent" />
                            <a 
                              href={source} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-accent hover:text-accent/80 underline truncate"
                              title={source}
                            >
                              {source.length > 40 ? source.substring(0, 40) + '...' : source}
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Key Services with Sources */}
              {(editableCompanyData?.key_services?.value || companyData?.key_services?.value)?.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-foreground flex items-center space-x-2">
                      <TrendingUp className="w-5 h-5 text-accent" />
                      <span>Key Services ({(editableCompanyData?.key_services?.value || companyData?.key_services?.value).length})</span>
                    </h3>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDataEdit('key_services.value')}
                      className="text-accent border-accent hover:bg-accent hover:text-white"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Edit All
                    </Button>
                  </div>
                  {editingData === 'key_services.value' ? (
                    <div className="space-y-3">
                      <Input
                        value={editingValue}
                        onChange={(e) => handleDataInputChange(e.target.value)}
                        className="h-10 text-sm bg-background/80 border-border text-foreground"
                        placeholder="Enter key services (comma separated)"
                      />
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          onClick={() => handleDataSave('key_services.value')}
                          className="btn-gradient text-white"
                        >
                          Save All
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleDataCancel}
                          className="border-border"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {(editableCompanyData?.key_services?.value || companyData?.key_services?.value).map((service: string, index: number) => (
                        <div key={index} className="bg-background/40 border border-border rounded-lg p-4 hover:border-accent/50 hover:shadow-md transition-all duration-200 glass">
                          <div className="flex items-center space-x-3 mb-3">
                            <div className="p-2 bg-accent/20 rounded-lg">
                              <div className="w-2 h-2 bg-accent rounded-full"></div>
                            </div>
                            <h4 className="text-sm font-semibold text-foreground">Service {index + 1}</h4>
                          </div>
                          <p className="text-sm text-foreground mb-2">{service}</p>
                          {(editableCompanyData?.key_services?.source || companyData?.key_services?.source)?.length > 0 && (
                            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                              <Link className="w-3 h-3" />
                              <span>{(editableCompanyData?.key_services?.source || companyData?.key_services?.source).length} source(s)</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Regulatory Details */}
              {(editableCompanyData?.regulatory_details || companyData?.regulatory_details) && Object.keys(editableCompanyData?.regulatory_details || companyData?.regulatory_details).length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-foreground flex items-center space-x-2">
                      <Shield className="w-5 h-5 text-accent" />
                      <span>Regulatory Information</span>
                    </h3>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDataEdit('regulatory_details')}
                      className="text-accent border-accent hover:bg-accent hover:text-white"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Edit All
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Supervisory Authority */}
                    {(editableCompanyData?.regulatory_details?.supervisory_authority?.value || companyData?.regulatory_details?.supervisory_authority?.value) && (
                      <div className="bg-background/40 border border-border rounded-lg p-4 hover:border-accent/50 hover:shadow-md transition-all duration-200 glass">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-accent/20 rounded-lg">
                              <Award className="w-4 h-4 text-accent" />
                            </div>
                            <h4 className="text-sm font-semibold text-foreground">Supervisory Authority</h4>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDataEdit('regulatory_details.supervisory_authority.value')}
                            className="h-6 w-6 p-0 text-muted-foreground hover:text-accent"
                          >
                            <Edit className="w-3 h-3" />
                          </Button>
                        </div>
                        {editingData === 'regulatory_details.supervisory_authority.value' ? (
                          <div className="space-y-2">
                            <Input
                              value={editingValue}
                              onChange={(e) => handleDataInputChange(e.target.value)}
                              className="h-8 text-sm"
                              placeholder="Enter supervisory authority"
                            />
                            <div className="flex items-center space-x-2">
                              <Button
                                size="sm"
                                onClick={() => handleDataSave('regulatory_details.supervisory_authority.value')}
                          className="btn-gradient text-white text-xs"
                        >
                          Save
                        </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={handleDataCancel}
                                className="text-xs"
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <p className="text-sm text-foreground mb-2">
                              {editableCompanyData?.regulatory_details?.supervisory_authority?.value || companyData?.regulatory_details?.supervisory_authority?.value}
                            </p>
                            {(editableCompanyData?.regulatory_details?.supervisory_authority?.source || companyData?.regulatory_details?.supervisory_authority?.source)?.length > 0 && (
                              <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                                <Link className="w-3 h-3" />
                                <span>{(editableCompanyData?.regulatory_details?.supervisory_authority?.source || companyData?.regulatory_details?.supervisory_authority?.source).length} source(s)</span>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    )}

                    {/* Parent Company */}
                    {companyData.regulatory_details.financial_metrics?.corporate_structure?.parent_company?.value && (
                      <div className="bg-background/40 border border-border rounded-lg p-4 hover:border-accent/50 hover:shadow-md transition-all duration-200 glass">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="p-2 bg-accent/20 rounded-lg">
                            <Building2 className="w-4 h-4 text-accent" />
                          </div>
                          <h4 className="text-sm font-semibold text-foreground">Parent Company</h4>
                        </div>
                        <p className="text-sm text-foreground mb-2">
                          {companyData.regulatory_details.financial_metrics.corporate_structure.parent_company.value}
                        </p>
                        {companyData.regulatory_details.financial_metrics.corporate_structure.parent_company.source?.length > 0 && (
                          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                            <Link className="w-3 h-3" />
                            <span>{companyData.regulatory_details.financial_metrics.corporate_structure.parent_company.source.length} source(s)</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Website */}
                    {companyData.regulatory_details.financial_metrics?.corporate_structure?.contact_information?.website?.value && (
                      <div className="bg-background/40 border border-border rounded-lg p-4 hover:border-accent/50 hover:shadow-md transition-all duration-200 glass">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="p-2 bg-accent/20 rounded-lg">
                            <Globe className="w-4 h-4 text-accent" />
                          </div>
                          <h4 className="text-sm font-semibold text-foreground">Website</h4>
                        </div>
                        <p className="text-sm text-foreground mb-2">
                          {companyData.regulatory_details.financial_metrics.corporate_structure.contact_information.website.value}
                        </p>
                        {companyData.regulatory_details.financial_metrics.corporate_structure.contact_information.website.source?.length > 0 && (
                          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                            <Link className="w-3 h-3" />
                            <span>{companyData.regulatory_details.financial_metrics.corporate_structure.contact_information.website.source.length} source(s)</span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}


            </CardContent>
          </Card>

          {/* Key Services Card */}
          <Card className="glass border border-border rounded-xl shadow-lg relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-accent rounded-t-xl"></div>
            <CardHeader className="border-b border-border pb-4 pt-6 bg-background/30">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-accent/20 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-accent" />
                </div>
                <CardTitle className="text-lg font-semibold text-foreground">
                  Key Services ({companyData?.key_services?.value?.length || 0})
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6 bg-background/20">
              {companyData?.key_services?.value?.length ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {companyData.key_services.value.map((service, index) => (
                    <div key={index} className="bg-background/40 border border-border rounded-lg p-4 hover:border-accent/50 hover:shadow-md transition-all duration-200 glass">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="p-2 bg-accent/20 rounded-lg">
                          <div className="w-2 h-2 bg-accent rounded-full"></div>
                        </div>
                        <h4 className="text-sm font-semibold text-foreground">Service {index + 1}</h4>
                      </div>
                      <p className="text-sm text-foreground mb-2">{service}</p>
                      {companyData.key_services.source?.length > 0 && (
                        <div className="space-y-2">
                          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                            <Link className="w-3 h-3" />
                            <span>{companyData.key_services.source.length} source(s)</span>
                          </div>
                          <div className="space-y-1">
                            {companyData.key_services.source.map((source: string, index: number) => (
                              <div key={index} className="flex items-center space-x-2 text-xs">
                                <ExternalLink className="w-3 h-3 text-accent" />
                                <a 
                                  href={source} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-accent hover:text-accent/80 underline truncate"
                                  title={source}
                                >
                                  {source.length > 40 ? source.substring(0, 40) + '...' : source}
                                </a>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-muted-foreground">No services specified</div>
              )}
            </CardContent>
          </Card>

          {/* Recent Press/News Card */}
          {companyData?.recent_press?.value?.length > 0 && (
            <Card className="glass border border-border rounded-xl shadow-lg relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-accent rounded-t-xl"></div>
              <CardHeader className="border-b border-border pb-4 pt-6 bg-background/30">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-accent/20 rounded-lg">
                    <FileText className="w-5 h-5 text-accent" />
                  </div>
                  <CardTitle className="text-lg font-semibold text-foreground">
                    Recent Press & News ({companyData.recent_press.value.length})
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6 bg-background/20">
                <div className="space-y-3">
                  {companyData.recent_press.value.map((press: any, index: number) => (
                    <div key={index} className="flex items-start space-x-3">
                      <FileText className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm text-foreground font-medium">{press.title || press}</p>
                        {press.description && (
                          <p className="text-xs text-muted-foreground mt-1">{press.description}</p>
                        )}
                        {companyData.recent_press.source?.length > 0 && (
                          <div className="space-y-2 mt-1">
                            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                              <Link className="w-3 h-3" />
                              <span>{companyData.recent_press.source.length} source(s)</span>
                            </div>
                            <div className="space-y-1">
                              {companyData.recent_press.source.map((source: string, index: number) => (
                                <div key={index} className="flex items-center space-x-2 text-xs">
                                  <ExternalLink className="w-3 h-3 text-accent" />
                                  <a 
                                    href={source} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-accent hover:text-accent/80 underline truncate"
                                    title={source}
                                  >
                                    {source.length > 40 ? source.substring(0, 40) + '...' : source}
                                  </a>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Regulatory Registrations Card */}
          {companyData?.regulatory_registrations?.value?.length > 0 && (
            <Card className="glass border border-border rounded-xl shadow-lg relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-accent rounded-t-xl"></div>
              <CardHeader className="border-b border-border pb-4 pt-6 bg-background/30">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-accent/20 rounded-lg">
                    <FileCheck className="w-5 h-5 text-accent" />
                  </div>
                  <CardTitle className="text-lg font-semibold text-foreground">
                    Regulatory Registrations ({companyData.regulatory_registrations.value.length})
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-6 bg-background/20">
                <div className="space-y-3">
                  {companyData.regulatory_registrations.value.map((registration, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm text-foreground">{registration}</p>
                        {companyData.regulatory_registrations.source?.length > 0 && (
                          <div className="space-y-2 mt-1">
                            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                              <Link className="w-3 h-3" />
                              <span>{companyData.regulatory_registrations.source.length} source(s)</span>
                            </div>
                            <div className="space-y-1">
                              {companyData.regulatory_registrations.source.map((source: string, index: number) => (
                                <div key={index} className="flex items-center space-x-2 text-xs">
                                  <ExternalLink className="w-3 h-3 text-accent" />
                                  <a 
                                    href={source} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-accent hover:text-accent/80 underline truncate"
                                    title={source}
                                  >
                                    {source.length > 40 ? source.substring(0, 40) + '...' : source}
                                  </a>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Certifications Card */}
          <Card className="glass border border-border rounded-xl shadow-lg relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-accent rounded-t-xl"></div>
            <CardHeader className="border-b border-border pb-4 pt-6 bg-background/30">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-accent/20 rounded-lg">
                  <Shield className="w-5 h-5 text-accent" />
                </div>
                <CardTitle className="text-lg font-semibold text-foreground">
                  Certifications ({companyData?.compliance_certifications?.value?.length || 0})
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6 bg-background/20">
              <div className="space-y-3">
                {companyData?.compliance_certifications?.value?.length ? (
                  companyData.compliance_certifications.value.map((cert, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm text-foreground">{cert}</p>
                        {companyData.compliance_certifications.source?.length > 0 && (
                          <div className="space-y-2 mt-1">
                            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                              <Link className="w-3 h-3" />
                              <span>{companyData.compliance_certifications.source.length} source(s)</span>
                            </div>
                            <div className="space-y-1">
                              {companyData.compliance_certifications.source.map((source: string, index: number) => (
                                <div key={index} className="flex items-center space-x-2 text-xs">
                                  <ExternalLink className="w-3 h-3 text-accent" />
                                  <a 
                                    href={source} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-accent hover:text-accent/80 underline truncate"
                                    title={source}
                                  >
                                    {source.length > 40 ? source.substring(0, 40) + '...' : source}
                                  </a>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-sm text-muted-foreground">No certifications specified</div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Compliance Objectives Card - Removed: Now shown in Compliance Objectives step */}
        </div>
      </StepperLayout>
    );
  }

  return null;
};

export default KnowMyOrg;
