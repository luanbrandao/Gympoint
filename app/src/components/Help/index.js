import React, { useMemo } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { parseISO, formatRelative } from 'date-fns';
import PropTypes from 'prop-types';
import pt from 'date-fns/locale/pt';
import {
  HelpContainer,
  HelpInfo,
  HelpStatus,
  HelpText,
  HelpTextAnswer,
  HelpTime,
  HelpQuestion,
} from './styles';

export default function Help({ data, onDetais }) {
  const dateParsed = useMemo(() => {
    return formatRelative(parseISO(data.createdAt), new Date(), {
      locale: pt,
      addSuffix: true,
    });
  }, [data.createdAt]);

  return (
    <HelpContainer onPress={onDetais}>
      <HelpInfo>
        <HelpStatus>
          {data.answer ? (
            <>
              <Icon name="check" size={20} color="#7FFF00" />
              <HelpTextAnswer>Respondido</HelpTextAnswer>
            </>
          ) : (
            <>
              <Icon name="check" size={20} color="#cecece" />
              <HelpText>Sem resposta</HelpText>
            </>
          )}
        </HelpStatus>

        <HelpTime>{dateParsed}</HelpTime>
      </HelpInfo>

      <HelpQuestion>{data.question}</HelpQuestion>
    </HelpContainer>
  );
}

Help.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onDetais: PropTypes.func.isRequired,
};

Help.defaultProps = {
  data: {},
};
