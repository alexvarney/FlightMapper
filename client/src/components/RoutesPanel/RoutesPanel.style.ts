import styled from "@emotion/styled";

export const Wrapper = styled.div`
  background-color: #a5b9c01a;
  display: flex;
  flex-direction: column;

  --primary: #a5b9c0;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  background: #182327;
  color: var(--primary);

  padding: 1rem;

  h2,
  button {
    margin: 0;
  }

  button {
    background-color: transparent;
    color: var(--primary);
    border: 2px solid var(--primary);
    border-radius: 4px;
    cursor: pointer;
    font-size: 24px;
    line-height: 14px;
    padding: 2px 4px;
    width: 29px;
    height: 29px;

    :hover {
      background: var(--primary);
      color: #182327;
    }
  }
`;

export const ListContainer = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  padding: 0.125rem 0;

  & > li {
    background: #020202;
    margin: 0.5rem;
    padding: 0.5rem;
    color: var(--primary);
    font-weight: 500;
  }
`;

export const Title = styled.h2``;

export const RouteListItemWrapper = styled.li`
  display: flex;
  align-items: center;
  gap: 1rem;

  & > span:first-child {
    flex-grow: 1;
    font-size: 20px;
  }
  & > span:last-child {
    white-space: nowrap;
  }
`;
