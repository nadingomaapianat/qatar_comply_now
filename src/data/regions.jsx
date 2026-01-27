import { Activity, Lock, Database, Leaf, FileWarning, ShieldAlert, Layers } from 'lucide-react';

export const regions = {
  egypt: {
    name: "Egypt",
    flag: "🇪🇬",
    hero: {
      titleHighlight: "Egyptian Banking Sector",
    },
    painPoints: {
      title: "The Egyptian Banking Sector Faces",
      description: "Traditional methods can't keep up with the pace of CBE regulations and global standards."
    },
    solutions: {
      cyber: {
        desc: "Align with CBE Frameworks & EG-FinCIRT readiness."
      },
      data: {
        desc: "GDPR/PDPL compliance & DPO dashboards for privacy."
      }
    },
    features: {
      frameworksDesc: "Pre-mapped controls for CBE regulations, GDPR, COSO, and GRI standards.",
      frameworksList: [
        "CBE Cybersecurity Framework",
        "EU GDPR & Egypt PDPL",
        "GRI Sustainability Standards"
      ]
    },
    footer: {
      desc: "The leading compliance automation platform for the Egyptian banking sector.",
      contact: {
        email: "contact@complynow.eg",
        phone: "+20 2 1234 5678",
        address: "Cairo, Egypt"
      }
    }
  },
  qatar: {
    name: "Qatar",
    flag: "🇶🇦",
    hero: {
      titleHighlight: "Qatari Banking Sector",
    },
    painPoints: {
      title: "The Qatari Financial Sector Faces",
      description: "Traditional methods can't keep up with QCB regulations and NIA standards."
    },
    solutions: {
      cyber: {
        desc: "Align with QCB Cloud Guidelines & NIA Policy readiness."
      },
      data: {
        desc: "PDPPL compliance & DPO dashboards for privacy."
      }
    },
    features: {
      frameworksDesc: "Pre-mapped controls for QCB regulations, PDPPL, COSO, and GRI standards.",
      frameworksList: [
        "QCB Cybersecurity Framework",
        "Qatar PDPPL Compliance",
        "GRI Sustainability Standards"
      ]
    },
    footer: {
      desc: "The leading compliance automation platform for the Qatari financial sector.",
      contact: {
        email: "contact@complynow.qa",
        phone: "+974 4400 1234",
        address: "Doha, Qatar"
      }
    }
  }
};
