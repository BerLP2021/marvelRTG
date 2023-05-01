import React from 'react'
import { Link,} from 'react-router-dom';
import {Helmet} from 'react-helmet';

import error from '../../resources/404.png';

const Page404 = () => {

  return (
    <div className='p404-wrapper'>
      <Helmet>
        <meta
            name="description"
            content='Error page'
        />
        <title>Error</title>
      </Helmet>
      <div className="col">
          <p className='p404-text'>Page doesn't exist</p>
          <Link className='p404-link' to='/'>Back to <span>Main page</span></Link>
      </div>
      <img src={error} alt="error404" />
    </div>
  )
}

export default Page404;