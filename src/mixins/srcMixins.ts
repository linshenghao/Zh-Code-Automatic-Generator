import {IMAGE,PATH} from '@/config/src'

export function useSrcMixins() {
	const src = IMAGE;
  const mx_PATH = PATH;
  return {
    src,mx_PATH
  }
}
