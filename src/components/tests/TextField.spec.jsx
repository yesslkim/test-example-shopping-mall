import { screen } from '@testing-library/react';
import React from 'react';

import TextField from '@/components/TextField';
import render from '@/utils/test/render';

it('className prop으로 설정한 css class가 적용된다.', async () => {
  // Arrange: 테스트 환경 구성
  // - className을 지닌 컴포넌트 렌더링
  await render(<TextField className="my-class" />);

  // Act: 테스트 동작 발생
  // - 렌더링에 대한 검증으로 이 단계는 생략
  // - 클릭, 메서드 호출, prop 변경 등에 대한 작업이 여기에 해당

  // Assert: 올바른 동작이 실행되었는지 검증
  // - 렌더링 후 DOM에 클래스 유무 검증
  expect(screen.getByPlaceholderText('텍스트를 입력해 주세요.')).toHaveClass(
    'my-class',
  );
});

// Note: it은 테스트의 기대결과를 작성함
// Note : test로도 작성가능. 주로 it('should ~')문구와 test('if~')문구의 차이정도.
// Note: describe의 경우 그룹핑의 역할

describe('placeholder', () => {
  it('기본 placeholder "텍스트를 입력해 주세요."가 노출된다.', async () => {
    await render(<TextField />);

    const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');

    expect(textInput).toBeInTheDocument();
  });

  it('placeholder props에 따라 placeholder가 노출된다.', async () => {
    await render(<TextField placeholder="상품명을 입력해 주세요." />);

    const textInput = screen.getByPlaceholderText('상품명을 입력해 주세요.');

    expect(textInput).toBeInTheDocument();
  });
});
