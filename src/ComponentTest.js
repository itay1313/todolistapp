import React, { useState } from 'react';
import AlwaysOpenExample from './widgets/Accordion';

const ComponentTest = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) {
    return null; // If isVisible is false, don't render anything
  }

  return (
    <div
      gap={2}
      class="alert alert-danger alert-dismissible fade show"
      role="alert"
    >
      <AlwaysOpenExample />
      <br />
      <strong>Oh snap! You got an error!</strong>
      <p>Change this and that and try again.</p>
      <button
        type="button"
        class="close"
        data-dismiss="alert"
        onClick={() => setIsVisible(false)}
        aria-label="Close"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
};

export default ComponentTest;
