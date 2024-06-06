import { WiggleRig } from 'wiggle/rig'

export default class WiggleBonesModifier {

    /** Modifier info */
    name = 'Wiggle Bones'
    description = `Uses the Wiggle library to animate the skeleton of a model.`
    icon = require('./bone.svg')

    /** Called on load */
    async onLoad() {

        // Find skinned mesh
        this.skinnedMesh = this.renderer.object?.getObjectByProperty('type', 'SkinnedMesh')
        if (!this.skinnedMesh)
            throw new Error(`No skeleton found on this object.`)

        // Create wiggle rig
        this.wiggleRig = new WiggleRig(this.skinnedMesh.skeleton)

    }

    /** Called every frame */
    onRender() {

        // Update wiggle rig
        this.wiggleRig?.update()

    }

    /** Called on unload */
    async onUnload() {

        // Destroy wiggle rig ... note that the wiggle rig has a reset method according to the docs,
        // but doesn't seem to exist in reality...
        this.wiggleRig?.reset?.()
        this.wiggleRig = null
        
    }

}