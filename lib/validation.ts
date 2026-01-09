// Validation helper file for agent registration
export interface ValidationErrors {
  name?: string;
  description?: string;
  category?: string;
  mcpServerUrl?: string;
  price?: string;
}

export const validateAgentForm = (
  formData: {
    name: string;
    description: string;
    category: string;
    mcpServerUrl: string;
    pricing: string;
    price: string;
  },
  currentStep?: number
): ValidationErrors => {
  const errors: ValidationErrors = {};

  // Step 1 validation
  if (currentStep === undefined || currentStep === 1) {
    if (!formData.name.trim()) {
      errors.name = 'Agent name is required';
    } else if (formData.name.length < 3) {
      errors.name = 'Agent name must be at least 3 characters';
    } else if (formData.name.length > 100) {
      errors.name = 'Agent name must not exceed 100 characters';
    }

    if (!formData.description.trim()) {
      errors.description = 'Description is required';
    } else if (formData.description.length < 10) {
      errors.description = 'Description must be at least 10 characters';
    } else if (formData.description.length > 1000) {
      errors.description = 'Description must not exceed 1000 characters';
    }

    if (!formData.category) {
      errors.category = 'Category is required';
    }
  }

  // Step 2 validation
  if (currentStep === undefined || currentStep === 2) {
    if (!formData.mcpServerUrl.trim()) {
      errors.mcpServerUrl = 'MCP Server URL is required';
    } else {
      try {
        const url = new URL(formData.mcpServerUrl);
        if (!url.protocol.startsWith('http')) {
          errors.mcpServerUrl = 'URL must start with http:// or https://';
        }
      } catch {
        errors.mcpServerUrl = 'Invalid URL format';
      }
    }

    // Pricing validation
    if (formData.pricing === 'paid') {
      if (!formData.price || parseFloat(formData.price) <= 0) {
        errors.price = 'Price must be greater than 0';
      }
    }
  }

  // Step 3 - No validation yet (optional fields only)

  return errors;
};
