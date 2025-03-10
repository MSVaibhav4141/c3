interface User2Info {
    id: string;
    name: string;
  }
  
  type Users2 = { [key: string]: User2Info };
  
  const users: Users2 = {
    'abc123': { id: 'abc123', name: 'John Doe' },
    'xyz789': { id: 'xyz789', name: 'Jane Doe' },
  };

  //OR 
//   It is used to create object interfaces 
type User2InfoCopy = Record<string, User2Info>

// Using map make it more simpler 
const mapOfUser = new Map<string,User2Info>()

mapOfUser.set('1', {id:'Kiet', name:'Laundary wae bhaiya'})