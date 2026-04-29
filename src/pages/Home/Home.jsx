import { Link } from 'react-router-dom'

function Home() {



  return ( <div>
    <Link className='primaryButton' to='/joinGroup'>Join Group</Link>
    <Link className='primaryButton' to='/createGroup'>Create Group</Link>
    <Link className='primaryButton' to='/test'>test</Link>
  </div>
  )
}

export default Home