stories.add('Input', () => {
  return (
    <Input
      placeholder="플레이스홀더"
      icon={select(
        'inputicon',
        ['PASSWORD', 'ID', ''],
        'PASSWORD' // default
      )}
      style={{
        height: '50px',
      }}
      onChange={e => console.log(e.target.value)}
    />
  )
})
