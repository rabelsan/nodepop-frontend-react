import { useState, useEffect } from 'react';

import { getAdsTags } from '../../api/adverts';

function AdTags () {
  const [tags, setTags] = useState(null);

  useEffect(() => {
    let error=null;
    getAdsTags().then(setTags).catch(error);
    console.log(tags);
    return console.log(error ? error : 'Tags request completed');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div>{JSON.stringify(tags)}</div>;

}

export default AdTags;
