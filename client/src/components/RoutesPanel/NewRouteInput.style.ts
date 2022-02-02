import styled from "@emotion/styled";

export const NewRouteFieldWrapper = styled.li`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  & > input {
    background: transparent;
    border: 1px solid var(--primary);
    color: var(--primary);
    padding: 0.25rem;
    border-radius: 0.25rem;
    flex-grow: 1;

    :focus {
      outline: none;
    }
  }

  & > input:not(:first-child) {
    flex-grow: 0;
    width: 8ch;
  }

  & > p {
    flex-grow: 1;
    margin: 0.125rem 0;
    font-size: 12px;
    font-weight: 800;
    text-overflow: ellipsis;
  }

  & > span {
    font-weight: 500;
    margin-left: 1rem;
  }

  align-items: center;

  button {
    background-color: transparent;
    color: var(--primary);
    border: 2px solid var(--primary);
    border-radius: 0.25rem;
    cursor: pointer;
    font-size: 18px;
    line-height: 14px;
    padding: 0.5rem;

    :hover {
      background: var(--primary);
      color: #182327;
    }
  }
`;

export const AirportInfoRow = styled.div`
  display: flex;
  gap: 1rem;

  width: 100%;
  overflow: hidden;

  align-items: center;

  & > span:last-of-type {
    font-size: 14px;
    font-weight: 800;
    flex-grow: 1;
    text-align: right;
  }
`;
