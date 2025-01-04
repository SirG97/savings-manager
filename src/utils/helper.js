export const getModelType = (modelString) => {
    const modelMap = {
      "App\\Models\\SuperAdmin": "super admin",
      "App\\Models\\Admin": "manager",
      "App\\Models\\Auditor": "auditor",
      "App\\Models\\Marketer": "marketer"
    };
  
    return modelMap[modelString] || "Unknown model";
}

export const getModelColor = (modelString) => {
    const modelMap = {
      "App\\Models\\SuperAdmin": "error",
      "App\\Models\\Admin": "warning",
      "App\\Models\\Auditor": "unknown",
      "App\\Models\\Marketer": "primary"
    };
  
    return modelMap[modelString] || "unknown";
}

export const getPaymentMethod = (modelString) => {
  const modelMap = {
    "cash": "error",
    "bank": "primary"
  };

  return modelMap[modelString] || "unknown";
}