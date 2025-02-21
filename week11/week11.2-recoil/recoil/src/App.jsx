import { RecoilRoot } from "recoil";
import { Memo } from "./Memo";

const App = () => {

  return<>
  {/* <CounterApp /> */}
  <RecoilRoot>
  <Memo />
  </RecoilRoot>
  </>
}

export default App;