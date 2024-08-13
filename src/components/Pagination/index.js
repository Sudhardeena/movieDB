import './index.css'

export default function Pagination(props) {
  const {pageNo, setPageNo} = props
  const setNextPage = () => setPageNo(pageNo + 1)
  const setPrevPage = () => {
    if (pageNo >= 2) {
      setPageNo(pageNo - 1)
    }
  }

  const prevPageArr = Array.from({length: 3}, (_, index) => pageNo - 1 - index)
    .filter(value => value > 0)
    .reverse()
  console.log(prevPageArr)
  const nextPageArr = Array.from({length: 4}, (_, index) => pageNo + index)
  const paginationArr = [...prevPageArr, ...nextPageArr]
  console.log(prevPageArr, nextPageArr)
  return (
    <div className="pagination-container">
      <button type="button" className="page-btn" onClick={setPrevPage}>
        Prev
      </button>
      {paginationArr.map(el => (
        <button
          key={el}
          type="button"
          className={el === pageNo ? 'page-btn active' : 'page-btn'}
          onClick={() => setPageNo(el)}
        >
          {el}
        </button>
      ))}
      <button type="button" className="page-btn" onClick={setNextPage}>
        Next
      </button>
    </div>
  )
}
