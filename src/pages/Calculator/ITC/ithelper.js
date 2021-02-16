// function calculateMinimumExemption(age) {
//   const NORMAL_EXEMPTION = 250000;
//   const SENIOR_EXEMPTION = 300000;
//   const SUPER_SENIOR_EXEMPTION = 500000;
//   if (age <= 60) {
//     return NORMAL_EXEMPTION;
//   }
//   if (age > 60 && age <= 80) {
//     return SENIOR_EXEMPTION;
//   }
//   if (age > 80) {
//     return SUPER_SENIOR_EXEMPTION;
//   }
//   return null;
// }

function calculateTotalInvestments(investments) {
  const MAX_80C_LIMIT = 150000;
  const MAX_80CCD_LIMIT = 50000;
  const MAX_80D_LIMIT = 50000;
  const { inv_c: invC, inv_ccd: invCCD, inv_mi: invMI } = investments;
  let totalInvestments = 0;

  if (invC && invC > 0) {
    if (invC >= MAX_80C_LIMIT) {
      totalInvestments = MAX_80C_LIMIT;
    } else {
      totalInvestments = invC;
    }
  }

  if (invCCD && invCCD > 0) {
    if (invCCD >= MAX_80CCD_LIMIT) {
      totalInvestments += MAX_80CCD_LIMIT;
    } else {
      totalInvestments += invCCD;
    }
  }

  if (invMI && invMI > 0) {
    if (invMI >= MAX_80D_LIMIT) {
      totalInvestments += MAX_80D_LIMIT;
    } else {
      totalInvestments += invMI;
    }
  }

  return totalInvestments;
}

function calculateTaxableIncome(gross, investments, deductions) {
  return gross - investments - deductions;
}

function calculateTotalDeductions(fd) {
  const STANDARD_DEDUCTION = 50000;
  const { id_hra: hra, id_other: otherDeduction } = fd;
  let deductions = STANDARD_DEDUCTION;

  if (hra && hra > 0) {
    deductions += hra;
  }

  if (otherDeduction && otherDeduction > 0) {
    deductions += otherDeduction;
  }
  return deductions;
}

function calculateStandardTax(income) {
  const STANDARD_TAX_5 = 0;
  const STANDARD_TAX_5_10 = 12500;
  const STANDARD_TAX_10 = 112500;
  const TAXLIMIT5 = 500000;
  const TAXLIMIT10 = 1000000;
  if (income <= TAXLIMIT5) {
    return STANDARD_TAX_5;
  }
  if (income > TAXLIMIT5 && income <= TAXLIMIT10) {
    return STANDARD_TAX_5_10;
  }
  if (income > TAXLIMIT10) {
    return STANDARD_TAX_10;
  }
  return null;
}

function calculateTaxPercentage(income) {
  const TAX_5 = 5;
  const TAX_5_10 = 20;
  const TAX_10 = 30;
  const TAXLIMIT5 = 500000;
  const TAXLIMIT10 = 1000000;
  if (income <= TAXLIMIT5) {
    return TAX_5;
  }
  if (income > TAXLIMIT5 && income <= TAXLIMIT10) {
    return TAX_5_10;
  }
  if (income > TAXLIMIT10) {
    return TAX_10;
  }
  return null;
}

function calculateStandardTaxLimit(income) {
  const STANDARD_TAXLIMIT_5 = 250000;
  const STANDARD_TAXLIMIT_5_10 = 500000;
  const STANDARD_TAXLIMIT_10 = 1000000;
  const TAXLIMIT5 = 500000;
  const TAXLIMIT10 = 1000000;
  if (income <= TAXLIMIT5) {
    return STANDARD_TAXLIMIT_5;
  }
  if (income > TAXLIMIT5 && income <= TAXLIMIT10) {
    return STANDARD_TAXLIMIT_5_10;
  }
  if (income > TAXLIMIT10) {
    return STANDARD_TAXLIMIT_10;
  }
  return null;
}

function calculateRebate(income) {
  const TAXLIMIT5 = 500000;
  const REBATE5 = 12500;
  if (income <= TAXLIMIT5) {
    return REBATE5;
  }
  return 0;
}

function calculateIncomeTax(taxableIncome) {
  const standardTax = calculateStandardTax(taxableIncome);
  const taxPercentage = calculateTaxPercentage(taxableIncome);
  const standardTaxLimit = calculateStandardTaxLimit(taxableIncome);
  const rebate = calculateRebate(taxableIncome);

  const incomeTax = standardTax + ((taxableIncome - standardTaxLimit - rebate) * taxPercentage) / 100;

  if (incomeTax < 0) {
    return 0;
  }
  return incomeTax;
}

function getTaxDetails(itdetails) {
  const { fd, inv } = itdetails;
  // let exemption = calculateMinimumExemption(pd['pd_age']);
  const investments = calculateTotalInvestments(inv);
  const deductions = calculateTotalDeductions(fd);
  const taxableIncome = calculateTaxableIncome(fd.id_gai, investments, deductions);
  const incomeTax = calculateIncomeTax(taxableIncome);
  return {
    investments,
    deductions,
    taxableIncome,
    incomeTax,
  };
}

export default getTaxDetails;
