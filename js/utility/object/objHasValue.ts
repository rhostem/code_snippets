const objHasValue = <T extends {}>(enumValue: T, target: any): boolean => {
  return Object.values(enumValue).includes(target);
};

export default objHasValue;
