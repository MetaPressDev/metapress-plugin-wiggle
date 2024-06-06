//
// My MetaPress Plugin

import packageJson from '../package.json'
import WiggleBonesModifier from './WiggleBonesModifier'

export default class MyMetaPressPlugin {

    // Plugin information
    id              = packageJson.metapress?.id || packageJson.name
    name            = packageJson.metapress?.name || packageJson.name
    description     = packageJson.metapress?.description || packageJson.description
    version         = packageJson.version
    provides        = [ 'modifier:wiggle-bones' ]
    requires        = [ 'entities', 'renderer' ]

    /** Create modifiers */
    createModifier(type) {
        if (type == 'wiggle-bones') return new WiggleBonesModifier()
    }

}