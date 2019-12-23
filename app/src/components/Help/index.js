import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  HelpContainer,
  HelpInfo,
  HelpStatus,
  HelpStatusText,
  HelpTime,
  HelpQuestion,
} from './styles';

export default function Help() {
  return (
    <HelpContainer>
      <HelpInfo>
        <HelpStatus>
          <Icon name="check" size={20} color="#cecece" />
          <HelpStatusText>Sem resposta</HelpStatusText>
        </HelpStatus>

        <HelpTime>hoje as 14h</HelpTime>
      </HelpInfo>

      <HelpQuestion>
        asdf asdf asdf asdfsdfsad fsdaf sadf asdf s df sdf asd asdf asdf asdf
        asdfsdfsad fsdaf sadf asdf s df sdf asd asdf asdf asdf asdfsdfsad fsdaf
        sadf asdf s df sdf asd asdf asdf asdf asdfsdfsad fsdaf sadf asdf s df
        sdf asd asdf asdf asdf asdfsdfsad fsdaf sadf asdf s df sdf asd asdf asdf
        asdf asdfsdfsad fsdaf sadf asdf s df sdf asd
      </HelpQuestion>
    </HelpContainer>
  );
}
