import XLSX from 'xlsx'
import axiosClient from 'utils/axiosClient'
import moment from 'moment'

const downloadXlsxFile = async () => {
  try {
    const res = await axiosClient().get(`/v1/orders/excel_data`)
    const data = res.data.data // 2차원 배열

    const filename = `주문정보 ${moment().format('YYYY-MM-DD HH:mm:ss')}.xlsx`
    var ws_name = '주문정보'
    const wb = XLSX.utils.book_new()
    const ws = XLSX.utils.aoa_to_sheet(data)

    XLSX.utils.book_append_sheet(wb, ws, ws_name)
    XLSX.writeFile(wb, filename)
  } catch (error) {
    console.log(`error`, error)
  }
}
