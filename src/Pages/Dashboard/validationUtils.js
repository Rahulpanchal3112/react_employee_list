// validationUtils.js
export const isValidNumber = (input) => /^\d{1,2}$/.test(input);

export const validateIssues = (Issues) => {
  let isValid = true;
  const errors = {
    issue: "",
    projectName: "",
    actualTime: "",
    estimatedTime: "",
  };

  if (!Issues.issue || Issues.issue.trim().length === 0) {
    errors.issue = "Description Is Required";
    isValid = false;
  } else if (Issues.issue.length > 300) {
    errors.issue = "Description Should Be Less Than 300 Words";
    isValid = false;
  }

  if (!Issues.ProjectName || Issues.ProjectName.trim().length === 0) {
    errors.projectName = "Required Field";
    isValid = false;
  }

  if (!Issues.ActualTime) {
    errors.actualTime = "Required Field";
    isValid = false;
  } else if (!isValidNumber(Issues.ActualTime)) {
    errors.actualTime = "Invalid Time Hours";
    isValid = false;
  }

  if (!Issues.EstimatedTime) {
    errors.estimatedTime = "Required Field";
    isValid = false;
  } else if (!isValidNumber(Issues.EstimatedTime)) {
    errors.estimatedTime = "Invalid Time Hours";
    isValid = false;
  }

  return { isValid, errors };
};
