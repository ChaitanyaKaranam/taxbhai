import React, { useState } from 'react';
import Expandor from '../../../components/Expandor';
import Form from '../../../components/Form';
import personalDetailsTemplate from '../../../templates/ITC/personalDetails.json';
import incomeDetailsTemplate from '../../../templates/ITC/incomeDetails.json';
import investmentDetailsTemplate from '../../../templates/ITC/investmentDetails.json';
import getTaxDetails from './ithelper';

function IncomeTaxCalculator() {
  const [itdetails, setITDetails] = useState({});

  function onSave({ id, values }) {
    let newITDetails = { ...itdetails };
    if (!newITDetails[id]) {
      newITDetails[id] = values;
    } else {
      newITDetails = { ...newITDetails, [id]: values };
    }
    setITDetails(newITDetails);
  }

  return (
    <div>
      <h1>Income Tax Calculator</h1>
      <hr />
      <div className="itc-layout">
        <Calculator onSave={onSave} />
        <TaxChart itdetails={itdetails} />
      </div>
    </div>
  );
}

function Calculator({ onSave }) {
  const [sectionsExpanded, setSectionsExpanded] = useState({});

  const ITC_CATEGORIES = [
    {
      template: personalDetailsTemplate,
      id: 'pd',
    },
    {
      template: incomeDetailsTemplate,
      id: 'fd',
    },
    {
      template: investmentDetailsTemplate,
      id: 'inv',
    },
  ];

  return (
    <div className="itc-layout-calculator">
      <article>
        {ITC_CATEGORIES.map((category, index) => {
          const { template, id } = category;
          const { title } = template;
          return (
            <Expandor
              key={title}
              isSectionExpanded={sectionsExpanded[index + 1] !== undefined ? sectionsExpanded[index + 1] : true}
              heading={`${index + 1}. ${title}`}
              index={index + 1}
            >
              <Form
                template={template}
                onSubmit={(values) => {
                  onSave({ id, values });
                  const newSectionsExpanded = { ...sectionsExpanded };
                  newSectionsExpanded[index + 1] = false;
                  setSectionsExpanded(newSectionsExpanded);
                }}
              />
            </Expandor>
          );
        })}
      </article>
    </div>
  );
}

function TaxChart({ itdetails }) {
  const { inv, fd } = itdetails;

  function renderTaxDetails() {
    if (inv && fd) {
      const { taxableIncome, deductions, investments, incomeTax } = getTaxDetails(itdetails);
      return (
        <div className="itc-layout-chart-details">
          <div>
            <span>Taxable Income:</span>
            <h1>{taxableIncome}</h1>
          </div>
          <div>
            <span>Deduction:</span>
            <h1>{deductions}</h1>
          </div>
          <div>
            <span>Investments:</span>
            <h1>{investments}</h1>
          </div>
          <div>
            <span>Income Tax:</span>
            <h1>{incomeTax}</h1>
          </div>
        </div>
      );
    }
    return <div>Enter Financial and Investment details</div>;
  }

  return (
    <div className="itc-layout-chart">
      <h3>Income Tax Details</h3>
      <hr />
      {renderTaxDetails()}
    </div>
  );
}

export default IncomeTaxCalculator;
