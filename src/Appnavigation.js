import { createStackNavigator, createAppContainer,DrawerNavigator } from 'react-navigation';
import Welcome from './welcome';
import Login from './login';
import Signupa from './signupa';
import Signupb from './signupb';
import Password from './password';
import Rpassword from './forgot';
import Home from './home';
import Dropin from './dropin';
import Tinygroup from './tinygroup';
import TinygroupA from './tinygroupA';
import TinygroupB from './tinygroupB';
import MommymeA from './mommy&meA';
import MommymeB from './mommy&meB';
import MommymeC from './mommy&meC';
import HomeCourt from './homeCourt';
import HomeCourtA from './homeCourtA';
import HomeCourtB from './homeCourtB';
import Birthday from './birthday';
import BirthdayA from './birthdayA';
import BirthdayB from './birthdayB';
import TeamTennis from './teamTennis';
import SummerA from './summerA';
import SummerB from './summerB';
import SummerC from './summerC';


const MainNavigator = createStackNavigator({
    password:{screen:Password, navigationOptions:{header:null}},
    signupa:{screen:Signupa, navigationOptions:{header:null}},
    signupb:{screen:Signupb, navigationOptions:{header:null}},
    
    welcome: { screen: Welcome, navigationOptions: { header: null } },
    login :{screen:Login,navigationOptions: {header: null }},
    
    password:{screen:Password, navigationOptions:{header:null}},
    forgot:{screen:Rpassword, navigationOptions:{header:null}},
    home: { screen: Home, navigationOptions: { header: null } },
    dropin: { screen: Dropin, navigationOptions: { header: null } },
    tinygroup: { screen: Tinygroup, navigationOptions: { header: null } },
    tinygroupA: { screen: TinygroupA, navigationOptions: { header: null } },
    tinygroupB: { screen: TinygroupB, navigationOptions: { header: null } },
    mommymeA: { screen: MommymeA, navigationOptions: { header: null } },
    mommymeB: { screen: MommymeB, navigationOptions: { header: null } },
    mommymeC: { screen: MommymeC, navigationOptions: { header: null } },
    homeCourt: { screen: HomeCourt, navigationOptions: { header: null } },
    homeCourtA: { screen: HomeCourtA, navigationOptions: { header: null } },
    homeCourtB: { screen: HomeCourtB, navigationOptions: { header: null } },
    birthday: { screen: Birthday, navigationOptions: { header: null } },
    birthdayA: { screen: BirthdayA, navigationOptions: { header: null } },
    birthdayB: { screen: BirthdayB, navigationOptions: { header: null } },
    teamTennis: { screen: TeamTennis, navigationOptions: { header: null } },
    summerA: { screen: SummerA, navigationOptions: { header: null } },
    summerB: { screen: SummerB, navigationOptions: { header: null } },
    summerC: { screen: SummerC, navigationOptions: { header: null } },
});
const Appnavigation = createAppContainer(MainNavigator);

export default Appnavigation;