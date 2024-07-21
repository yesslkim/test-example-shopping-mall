import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

export default async component => {
  const user = userEvent.setup();
  // click, 키보드 이벤트등 실제 이벤트와 유사하게 시뮬레이션할 수 있도록
  // 도와주는 라이브러리

  return {
    user,
    ...render(component),
  };
};
