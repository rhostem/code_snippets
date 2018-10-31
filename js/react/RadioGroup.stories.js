stories.add('RadioGroup', () => {
  return (
    <div>
      <h2>text</h2>
      <RadioGroup>
        <input id="1" type="radio" name="unique" value="1" />
        <label htmlFor="1">라벨1</label>
        <input id="2" type="radio" name="unique" value="1" />
        <label htmlFor="2">라벨2</label>
      </RadioGroup>

      <h2>input</h2>
      <RadioGroup>
        <input id="input1" type="radio" name="radioInput" value="input1" />
        <label htmlFor="input1">
          <input type="text" />
        </label>
        <input id="input2" type="radio" name="radioInput" value="input2" />
        <label htmlFor="input2" style={{ clear: 'left', marginTop: '10px' }}>
          <input type="text" />
        </label>
      </RadioGroup>
    </div>
  )
})
