class render extends React.Component {
    
  constructor(props) {
    super(props)
    this.state = {
      isAddressSearchVisible: false,
    }
  }
  
  handleOpenDaumAddressSearch = e => {
    e.preventDefault()

    var elementLayer = document.getElementById('addressSearchLayer')
    console.log(elementLayer)

    daum.postcode.load(() => {
      new daum.Postcode({
        oncomplete: data => {
          // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분입니다.
          // 예제를 참고하여 다양한 활용법을 확인해 보세요.
          this.handleChangeForm('address', data.address)
          this.setState({ isAddressSearchVisible: false })
        },
        width: '100%',
        height: '100%',
        maxSuggestItems: 5,
      }).embed(elementLayer)

      this.setState({ isAddressSearchVisible: true })
    })
  }
  
  render() {
    return (
      <div>
        <input
          type="text"
          value={formData.address}
          onClick={this.handleOpenDaumAddressSearch}
        />
        <DaumAddressSearchLayer
          layerId="addressSearchLayer"
          isVisible={this.state.isAddressSearchVisible}
          onClose={() => this.setState({ isAddressSearchVisible: false })}
        />
      </div>
    )
  }
  
  
}