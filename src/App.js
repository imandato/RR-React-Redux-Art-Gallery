import './App.css'
import { useSelector, useDispatch, connect } from 'react-redux'
import { resetData, fetchData, increment, decrement, customId } from './features/dataSlice'
import { useEffect } from 'react'


function App(props) {
  const dispatch = useDispatch()
  const data = useSelector((state) => state.data)
  const renderImg = () => {
    if(data.apiData) {
      return <img style={{'width': '100vw'}} src={data.apiData.primaryImage} alt={data.apiData.title} />
    } else {
      return <p>image here</p>
    }
  }
  useEffect(() => {
    dispatch(fetchData())
  }, [props.objectId, dispatch])

  return (
    <div className="App">
      <div>
        <button onClick={() => dispatch(fetchData())}>Thunk!</button>
        <button onClick={() => dispatch(resetData())}>Clear</button>
        <button onClick={() => dispatch(increment())}>Next</button>
        <button onClick={() => dispatch(decrement())}>Back</button>
      </div>
      <input value={ data.objectId } onChange={(e) => {
        dispatch(customId(Number(e.target.value)))
      }} />
      <div>
        {data.objectId}
        {renderImg()}
      </div>
    </div>
  );
}


const mapStateToProps = (state, ownProps) => ({
  objectId: state.data.objectId
})


export default connect(mapStateToProps)(App)