import React from 'react';
import ReactLoading from 'react-loading';
import colors from '~/styles/colors';

const Loading = () => (
  <div>
    <div>
      <ReactLoading color={colors.primary} height={267} width={475} />
    </div>
    <h1>Carregando...</h1>
  </div>
);

export default Loading;
