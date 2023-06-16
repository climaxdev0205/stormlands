import React, { useState, useEffect } from 'react';
import { FormField } from 'src/API';

interface SubStep {
  id: string;
  label: string;
  sortOrder: number;
  isCompleted: boolean;
  formFields?: FormField[];
}

export interface WithFormFieldsStateProps {
  data: SubStep;
}

// Higher-order component to inject formFieldsState and setFormFieldsState
const withFormFieldsState = <P extends object>(
  WrappedComponent: React.ComponentType<P>
): React.FC<P & WithFormFieldsStateProps> => {
  const WithFormFieldsState: React.FC<P & WithFormFieldsStateProps> = ({ data, ...props }: WithFormFieldsStateProps & P) => {
    const [formFieldsState, setFormFieldsState] = useState<FormField[]>([]);
    const [newFormFieldsState, setNewFormFieldsState] = useState<FormField[]>([]);
    const [subStepId, setSubStepId] = useState<string>('');

    useEffect(() => {
      if (data.formFields) {
        setFormFieldsState(data.formFields);
      }
      if (data.id) {
        setSubStepId(data.id);
      }
    }, [data]);

    return (
      <WrappedComponent
        {...(props as P)}
        formFieldsState={formFieldsState}
        setFormFieldsState={setFormFieldsState}
        newFormFieldsState={newFormFieldsState}
        subStepId={subStepId}
      />
    );
  };

  WithFormFieldsState.displayName = `WithFormFieldsState(${getDisplayName(WrappedComponent)})`;
  return WithFormFieldsState;
};

function getDisplayName(WrappedComponent: React.ComponentType<any>): string {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default withFormFieldsState;