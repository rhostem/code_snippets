const isMarkup = (str: string) => /<\/?[a-z][\s\S]*>/i.test(str);

export default isMarkup;
