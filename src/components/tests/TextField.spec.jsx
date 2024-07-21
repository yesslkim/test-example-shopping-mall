import { screen } from '@testing-library/react';
import React from 'react';

import TextField from '@/components/TextField';
import render from '@/utils/test/render';

it('className props으로 설정한 css class가 적용된다.', async () => {
  await render(<TextField className="my-class" />);

  expect(screen.getByPlaceholderText('텍스트를 입력해 주세요.')).toHaveClass(
    'my-class',
  );
});

describe('placeholder', () => {
  it('기본 placeholder "텍스트를 입력해 주세요."가 노출된다.', async () => {
    await render(<TextField />);

    const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');
    expect(textInput).toBeInTheDocument(); // jest 확장해서 사용하는거임. vitest에는 존재하지않음.
  });

  it('placeholder prop에 따라 placeholder가 변경된다..', async () => {
    const placeholder = '플레이스홀더';
    await render(<TextField placeholder={placeholder} />);

    const textInput = screen.getByPlaceholderText(placeholder);
    expect(textInput).toBeInTheDocument(); // jest 확장해서 사용하는거임. vitest에는 존재하지않음.
  });
});

it('텍스트 입력 시 onChange props로 등록한 함수가 호출된다.', async () => {
  const spy = vi.fn(); // 스파이 함수
  // 스파이 함수 : 테스트 코드에서 특정함수가 호출되었는지, 함수의 인자로 어떤 것이 넘어왔는지 어떤 값을 반환하는지 등
  const { user } = await render(<TextField onChange={spy} />);

  const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');
  await user.type(textInput, 'test');
  expect(spy).toHaveBeenCalledWith('test');
});

it('Enter 입력 시 onEnter props로 등록한 함수가 호출한다.', async () => {
  const spy = vi.fn();

  const { user } = await render(<TextField onEnter={spy} />);
  const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');

  await user.type(textInput, 'test{Enter}');
  expect(spy).toHaveBeenCalledWith('test');
});

it('Focus 활성화 시 onFocus props로 등록한 함수가 호출한다.', async () => {
  // 포커스 활성화
  // 탭 키로 인풋 요소로 포커스 이동
  // 인풋 요소를 클릭
  const spy = vi.fn();

  const { user } = await render(<TextField onFocus={spy} />);
  const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');

  await user.click(textInput); // click과 관련된 포커스, 마우스다운, 마우스업 등..
  expect(spy).toHaveBeenCalled();
});

it('Focus 활성화 시 border 스타일이 추가된다.', async () => {
  const { user } = await render(<TextField />);

  const textInput = screen.getByPlaceholderText('텍스트를 입력해 주세요.');

  await user.click(textInput);

  expect(textInput).toHaveStyle({
    borderWidth: '2px',
    borderColor: 'rgb(25,118,210',
  });
});
