import React from 'react';
import styled from 'styled-components';

const Wrap = styled.div`

`;

const Title = styled.div`
  font-size: 18px;
  color: #333;
  font-weight: bold;
  margin-bottom: 12px;
`;

const Listing = styled.div`

`;

const Command = styled.div`
  margin-bottom: 6px;
  display: flex;
  align-items: center;
  position: relative;
`;

const CommandIndex = styled.div`
  position: absolute;
  text-align: right;
  right: 100%;
  transform: translateX(-8px);
  color: #777;
`;

const CommandValue = styled.div`
  width: 60px;
  font-weight: bold;
  color: ${props => props.color};
`;

const CommandStack = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-right: 20px;
`;

const CommandStackItem = styled.div`
  background: #053858;
  border-radius: 4px;
  color: white;
  padding: 2px 5px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CommandStackEmpty = styled.div`
  color: #777;
`;

const CommandMeta = styled.div`
  color: #777;
`;

const color = (command) => {
  // Controls related commands
  if (['poi', 'swi'].includes(command)) {
    return '#777';
  }

  // Operations on numbers
  if (['add', 'sub', 'mul', 'div', 'mod', 'not', 'gre'].includes(command)) {
    return '#19A027';
  }

  // Stack movements
  if (['pus', 'pop', 'dup', 'rol'].includes(command)) {
    return '#1927A0';
  }

  // Input/output
  if (['ich', 'inn', 'och', 'onn'].includes(command)) {
    return '#1998A0';
  }

  return '#333';
};

export default ({ assembler, ...props }) => {
  return (
    <Wrap {...props}>
      <Title>
        Assembler & Stack Listing
      </Title>

      <Listing>
        {assembler.map(({ command, stack, meta }, index) => (
          <Command>
            <CommandIndex>{index + 1}:</CommandIndex>
            <CommandValue color={color(command)}>{command}</CommandValue>
            <CommandStack>
              {stack.length > 3 && (
                <CommandStackEmpty>{'<'}{stack.length - 3}{'>'}</CommandStackEmpty>
              )}
              {stack.slice(-3).map((value) => (
                <CommandStackItem>{value}</CommandStackItem>
              ))}
              {stack.length === 0 && (
                <CommandStackEmpty>(empty)</CommandStackEmpty>
              )}
            </CommandStack>
            {meta && (
              <CommandMeta>
                {meta}
              </CommandMeta>
            )}
          </Command>
        ))}
      </Listing>
    </Wrap>
  );
};
