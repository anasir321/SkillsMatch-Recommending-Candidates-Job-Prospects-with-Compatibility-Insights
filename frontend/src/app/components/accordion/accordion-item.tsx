import React from "react";

// type
type IPropType = {
  id:string;
  title:string;
  desc:string;
  isShow?:boolean;
  parent:string;
}

const AccordionItem = ({id,title,isShow,desc,parent}:IPropType) => {
  return (
    <div className="accordion-item">
      <div className="accordion-header" id={`heading-${id}`}>
        <button
          className={`accordion-button ${isShow?'':'collapsed'}`}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#collapse-${id}`}
          aria-expanded={isShow?'true':'false'}
          aria-controls={`collapse-${id}`}
        >
          {title}
        </button>
      </div>
      <div
        id={`collapse-${id}`}
        className={`accordion-collapse collapse ${isShow?'show':''}`}
        aria-labelledby={`heading-${id}`}
        data-bs-parent={`#${parent}`}
      >
        <div className="accordion-body">
          <p>
            {desc}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AccordionItem;
