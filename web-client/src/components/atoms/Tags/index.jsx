import React from 'react';
import styled from 'styled-components';

const MAIN_COLOR = '#053858';

const Tags = styled.div`
  display: flex;
  gap: 12px;
`;

const Tag = styled.div`
  font-size: 14px;
  border-radius: 20px;
  padding: 8px 12px;

  color: ${props => props.active ? '#fff' : MAIN_COLOR};
  background: ${props => props.active ? MAIN_COLOR : '#fff'};
  border: ${props => props.active ? 'none' : `1px solid ${MAIN_COLOR}`};

  cursor: pointer;
`;

export default ({ options, value, onChange }) => {
  return (
    <Tags>
      {options.map((option) => (
        <Tag key={option.value} active={value === option.value} onClick={() => onChange(option.value)}>
          {option.label}
        </Tag>
      ))}
    </Tags>
  );
};
