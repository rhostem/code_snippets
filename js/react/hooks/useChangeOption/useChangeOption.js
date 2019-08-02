import { useState, useEffect } from 'react';

/**
 * 옵션을 선택하는 컴포넌트에 사용할 수 있는 커스텀 훅
 * @param {*} param0
 */
const useChangeOption = ({
  onChange = value => {},
  options = [], //
  initialValue,
}) => {
  const [value, setValue] = useState(initialValue);
  const [label, setLabel] = useState('');
  const [optionsAvailable, setOptionsVisible] = useState(options);

  const handleChange = value => {
    setValue(value);
  };

  // value 변경시 onChange 콜백 실행
  useEffect(() => {
    onChange(value);
  }, [onChange, value]);

  // 라벨 업데이트
  useEffect(() => {
    const target = options.find(o => o.value === value);
    setLabel(target ? target.label : '');
  }, [options, value]);

  // 초기값 반영
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  // 선택 가능한 옵션 업데이트
  useEffect(() => {
    // 선택된 값 제외
    setOptionsVisible(options.filter(o => o.value !== value));
  }, [options, value]);

  return [value, label, handleChange, optionsAvailable];
};

export default useChangeOption;
