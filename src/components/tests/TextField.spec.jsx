import { screen } from '@testing-library/react';
import React from 'react';

import TextField from '@/components/TextField';
import render from '@/utils/test/render';

// Clear mocks and add some testing data after before each test run
// NOTE: 맨위에 작성하게 되면 전역함수처럼 작성되게됨
// beforeEach(async () => {
//   await stopMocking()
//   await addUser({ name: 'John' })
// });

// NOTE: beforeEach와 동일하지만 beforeAll의 경우 단 한번만 사용됨
// NOTE: beforeAll이 beforeEach보다 먼저 생성됨.
// beforeAll(async () => { })

it('className prop으로 설정한 css class가 적용된다.', async () => {
  // NOTE: 블록단위로도 사용 가능.
  // beforeEach(async () => { })

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

  it('텍스트 입력 시 onChange prop으로 등록한 함수가 호출된다.', async () => {
    // NOTE: 스파이함수
    const spy = vi.fn();
    const { user } = await render(<TextField onChange={spy} />);

    const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');

    // NOTE: userEvent로 text typing 이벤트를 텍스트 할 수 있음.
    await user.type(textInput, 'test');

    expect(spy).toHaveBeenCalledWith('test');
  });

  it('엔터키 입력 시 onEnter prop으로 등록한 함수가 호출된다.', async () => {
    // NOTE: 스파이함수
    const spy = vi.fn();
    const { user } = await render(<TextField onEnter={spy} />);

    const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');

    // NOTE: userEvent로 text typing 이벤트를 텍스트 할 수 있음.
    await user.type(textInput, 'test{Enter}');

    expect(spy).toHaveBeenCalledWith('test');
  });

  it('포커스 활성화 시 onFocus prop으로 등록한 함수가 호출된다.', async () => {
    // NOTE: Focus 활성화
    // 1. 탭 키로 활성화
    // 2. 인풋 요소 클릭 시 <-- 테스트는 이걸로
    // 3. textInput.focus()로 직접 발생

    const spy = vi.fn();
    const { user } = await render(<TextField onFocus={spy} />);

    const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');

    // NOTE: userEvent로 text typing 이벤트를 텍스트 할 수 있음.
    await user.type(textInput, 'test{Enter}');

    expect(spy).toHaveBeenCalled();
  });

  it('포커스 활성화 시 onFocus prop으로 등록한 함수가 호출된다.', async () => {
    // NOTE: Focus 활성화
    // 1. 탭 키로 활성화
    // 2. 인풋 요소 클릭 시 <-- 테스트는 이걸로
    // 3. textInput.focus()로 직접 발생
    const { user } = await render(<TextField />);

    const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');

    await user.click(textInput);

    expect(textInput).toHaveStyle({
      borderWidth: '2px',
      borderColor: 'rgb(25, 118, 210)',
    });
  });
});
