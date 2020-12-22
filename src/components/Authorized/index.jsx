import Authorized from './Authorized';
import Secured from './Secured';
import check from './CheckPermissions';
import renderAuthorize from './renderAuthorize';

Authorized.Secured = Secured;
Authorized.check = check;
const RenderAuthorize = renderAuthorize(Authorized);
/**
 * 导出实际上是一个以 Authorized 组件为参数的函数
 */
export default RenderAuthorize;
