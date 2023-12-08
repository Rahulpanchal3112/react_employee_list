// validationUtils.js
export const isValidNumber = (input) =>
  /^(0?[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(input);

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

  if (Issues.ActualTime !== "") {
    if (!isValidNumber(Issues.ActualTime)) {
      errors.actualTime = "Time Hours Should Be Ex:2:00 This Format";
      isValid = false;
    }
  }

  if (!Issues.EstimatedTime) {
    errors.estimatedTime = "Required Field";
    isValid = false;
  } else if (!isValidNumber(Issues.EstimatedTime)) {
    errors.estimatedTime = "Time Hours Should Be Ex:2:00 This Format";
    isValid = false;
  }

  return { isValid, errors };
};
