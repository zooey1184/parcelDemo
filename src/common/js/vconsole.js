import VConsole from 'vconsole'
// import { appDevEvn } from './base.js'
import {env} from '@/common/js/env'

export function vConsole() {
	if (env()) {
		var vConsole = new VConsole();
	}
}
