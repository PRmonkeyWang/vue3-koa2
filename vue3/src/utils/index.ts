import { omit } from 'lodash';
import { ElMessage } from 'element-plus';
// Parse the time to string
export const parseTime = (
  time?: object | string | number | null,
  cFormat?: string
): string | null => {
  if (time === undefined || !time) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date: Date
  if (typeof time === 'object') {
    date = time as Date
  } else {
    if (typeof time === 'string') {
      if (/^[0-9]+$/.test(time)) {
        // support "1548221490638"
        time = parseInt(time)
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj: { [key: string]: number } = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const timeStr = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    return value.toString().padStart(2, '0')
  })
  return timeStr
}

// Format and filter json data using filterKeys array
export const formatJson = (filterKeys: any, jsonData: any) =>
  jsonData.map((data: any) => filterKeys.map((key: string) => {
    if (key === 'timestamp') {
      return parseTime(data[key])
    } else {
      return data[key]
    }
  }))

// Check if an element has a class
export const hasClass = (ele: HTMLElement, className: string) => {
  return !!ele.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
}

// Add class to element
export const addClass = (ele: HTMLElement, className: string) => {
  if (!hasClass(ele, className)) ele.className += ' ' + className
}

// Remove class from element
export const removeClass = (ele: HTMLElement, className: string) => {
  if (hasClass(ele, className)) {
    const reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
    ele.className = ele.className.replace(reg, ' ')
  }
}

// Toggle class for the selected element
export const toggleClass = (ele: HTMLElement, className: string) => {
  if (!ele || !className) {
    return
  }
  let classString = ele.className
  const nameIndex = classString.indexOf(className)
  if (nameIndex === -1) {
    classString += '' + className
  } else {
    classString =
      classString.substr(0, nameIndex) +
      classString.substr(nameIndex + className.length)
  }
  ele.className = classString
}

export function isMobile() {
  const { body } = document;
  const BETTERWIDTH = 1024;
  const rect = body.getBoundingClientRect()
  return rect.width - 1 < BETTERWIDTH
}

// 根据key将多级数组展开成1级数组
export function flattenByKey(arr: any[], key: string) {
  const flattenArr: any[] = [];
  const arrfilter = (arr: any[], key: string) => {
    arr.forEach(n => {
      if (!n[key]) {
        flattenArr.push(n)
      } else {
        flattenArr.push(omit(n, [key]))
        arrfilter(n[key], key)
      }
    })
  }

  arrfilter(arr, key);

  return flattenArr;
}

export const formatDate = (date: Date, fmt: string) => {
  const o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds() // 毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length)
    );
  }
  for (const k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1
          ? o[k]
          : ('00' + o[k]).substr(('' + o[k]).length)
      );
    }
  }
  return fmt;
};

// 将数据格式化成tree的格式。fil true的的时候type3 的不要
export function format(arr: any[], fil = false) {
  const formatArr: any[] = [];
  arr.forEach(n => {
    if (n.is_deleted !== '1') {
      const item: any = {
        ...n,
        label: n.menu_name || n.name,
        value: n.id
      }
      if (n.child) {
        if (!fil) {
          const children = format(n.child, fil);
          if (children.length) {
            item.children = children
          }
        } else {
          if (n.child.find((m: any) => m.type !== '3')) {
            const children = format(n.child, fil);
            if (children.length) {
              item.children = children
            }
          }
        }
      }
      formatArr.push(item)
    }
  })

  return formatArr;
}

// 判断是否图片
export function isAssetTypeAnImage(ext: string) {
  if (!ext) return false
  let flag = false
  const arr = ['png', 'jpg', 'jpeg', 'bmp', 'gif', 'webp', 'psd', 'svg', 'tiff']

  arr.forEach(element => {
    if (ext.toLowerCase().includes(element)) flag = true
  });

  return flag
}
// 判断文件类型

export function fileType(fileName: string, imgArr: any) {
  if (!fileName) return false
  const type = fileName.substring(fileName.lastIndexOf('.') + 1);
  switch (type) {
    case 'txt':
      return imgArr.txt
      break;
    case 'pdf':
      return imgArr.pdf
      break;
    case 'doc':
    case 'docx':
      return imgArr.word
      break;
    case 'ppt':
    case 'pptx':
      return imgArr.ppt
      break;
    case 'zip':case 'rar':case '.gz':
      return imgArr.zip
      break;
    case 'xls':case 'xlsx':
      return imgArr.excel
      break;
    case 'avi':case 'wmv':case 'mp4':case 'rm':case 'mp3':case 'swf':case 'ram':case 'wav':
      return imgArr.video
      break;
    default:
      return imgArr.other
      break;
  }
}
// 身份证脱敏
export function idCardFilter(str: string) {
  return str.replace(/^(.{4})(?:\d+)(.{4})$/, '$1******$2')
}

// 下载浏览器防阻止方法
export function open(url: any) {
  const a = document.createElement('a');
  a.setAttribute('href', url)
  a.setAttribute('target', '_blank')
  a.setAttribute('id', 'down_id')
  if (document.getElementById('down_id')) {
    document.body.appendChild(a)
  }
  a.click();
}

// 双击复制
export function copyVale(type: string, e: any) {
  if (e.target.value !== '' && ['order_number', 'user_name', 'mobile', 'amount', 'account to be credited', 'refund amount'].includes(type)) {
    document.execCommand('Copy');
    e.target.select();
    ElMessage({
      message: '复制成功',
      type: 'success'
    })
  }
}

export function sign(arr: any, type: any) {
  let parentIds: any[] = [];
  const index = 0;
  const hasParentId = (function loop(arr, index = 0) {
    return arr.some((item: any) => {
      if (item.id === type[0]) {
        parentIds = parentIds.slice(0, index)
        return true
      } else if (Array.isArray(item.child)) {
        parentIds[index] = item.id
        return loop(item.child, index + 1)
      } else {
        return false
      }
    })
  }(arr, index))
  return hasParentId ? parentIds : []
}

export function signType(type: any) {
  let Arr: any[] = [];
  if (type.includes('3') && !type.includes('7')) {
    Arr = ['ComplaintChannel']
  } else if (!type.includes('3') && type.includes('7')) {
    Arr = ['task_number'];
  } else if (type.includes('3') && type.includes('7')) {
    Arr = ['task_number', 'ComplaintChannel']
  }
  return Arr
}

export function isIos() {
  const u = navigator.userAgent;
  const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
  if (isAndroid) {
    return false;
  } else {
    return true;
  }
}
