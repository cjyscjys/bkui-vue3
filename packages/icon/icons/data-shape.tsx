
/*
* Tencent is pleased to support the open source community by making
* 蓝鲸智云PaaS平台社区版 (BlueKing PaaS Community Edition) available.
*
* Copyright (C) 2021 THL A29 Limited, a Tencent company.  All rights reserved.
*
* 蓝鲸智云PaaS平台社区版 (BlueKing PaaS Community Edition) is licensed under the MIT License.
*
* License for 蓝鲸智云PaaS平台社区版 (BlueKing PaaS Community Edition):
*
* ---------------------------------------------------
* Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
* documentation files (the "Software"), to deal in the Software without restriction, including without limitation
* the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
* to permit persons to whom the Software is furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of
* the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO
* THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
* CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
* IN THE SOFTWARE.
*/
import { FunctionalComponent } from 'vue';

import BkIcon, { IIconBaseProps } from './icon';
const data = JSON.parse('{"type":"element","name":"svg","attributes":{"xmlns":"http://www.w3.org/2000/svg","viewBox":"0 0 1024 1170.2857142857142","style":"width: 1em; height: 1em; vertical-align: middle;fill: currentColor;overflow: hidden;"},"elements":[{"type":"element","name":"path","attributes":{"d":"M176.27428571428572 248.68571428571425c100.74209523809523 24.673523809523807 216.40533333333332 38.863238095238096 335.335619047619 38.863238095238096s234.5935238095238-14.14095238095238 345.38057142857144-40.86247619047619c106.30095238095238-27.209142857142858 167.00952380952378-74.02057142857143 167.00952380952378-100.35199999999999 0-49.00571428571428-180.66285714285715-146.28571428571428-512-146.28571428571428s-512 95.81714285714285-512 146.28571428571428c0 26.33142857142857 60.70857142857143 73.14285714285714 176.27428571428572 102.4z"}},{"type":"element","name":"path","attributes":{"d":"M856.5028571428571 923.7942857142857c-99.2304761904762 25.6-213.13828571428573 40.27733333333333-330.45942857142853 40.27733333333333-4.924952380952381 0-9.849904761904762-0.04876190476190476-14.774857142857142-0.09752380952380953-3.4620952380952374 0.04876190476190476-8.387047619047618 0.09752380952380953-13.360761904761905 0.09752380952380953-117.32114285714286 0-231.18019047619046-14.677333333333332-339.87047619047615-42.37409523809524-113.37142857142858 37.156571428571425-157.98857142857142 81.77371428571428-157.98857142857142 102.25371428571428 0 49.00571428571428 180.66285714285715 146.28571428571428 512 146.28571428571428s512-95.08571428571427 512-146.28571428571428c0-20.479999999999997-44.61714285714286-65.09714285714286-167.49714285714285-100.2057142857143z"}},{"type":"element","name":"path","attributes":{"d":"M856.5028571428571 626.8342857142857c-103.37523809523809 25.063619047619046-222.0617142857143 39.44838095238095-344.16152380952377 39.44838095238095s-240.73752380952382-14.384761904761904-354.4990476190476-41.54514285714286c-113.27390476190476 37.20533333333333-157.8910476190476 82.55390476190476-157.8910476190476 106.69104761904762 0 49.00571428571428 180.66285714285715 146.28571428571428 512 146.28571428571428s512-95.08571428571427 512-146.28571428571428c0-24.137142857142855-44.61714285714286-69.48571428571428-167.49714285714285-104.5942857142857z"}},{"type":"element","name":"path","attributes":{"d":"M856.5028571428571 332.0685714285714h-13.165714285714285c-99.42552380952381 25.40495238095238-213.62590476190476 40.03352380952381-331.23961904761904 40.22857142857142-3.072 0-6.534095238095238 0.04876190476190476-10.04495238095238 0.04876190476190476-114.00533333333333 0-224.88990476190475-13.604571428571429-330.9958095238095-39.30209523809524l-2.8769523809523805 1.9504761904761905c-123.61142857142858 30.72-168.22857142857143 77.53142857142858-168.22857142857143 99.47428571428571 0 49.00571428571428 180.66285714285715 146.28571428571428 512 146.28571428571428s512-95.81714285714285 512-146.28571428571428c0-21.942857142857143-44.61714285714286-68.7542857142857-167.49714285714285-102.4z"}}]}');
const dataShape: FunctionalComponent<IIconBaseProps> = (props, context) => {
  const p = { ...props, ...context.attrs };
  return <BkIcon {...p}  data={data} name="dataShape"></BkIcon>;
};

dataShape.displayName = 'dataShape';
dataShape.inheritAttrs = false;

export default dataShape;