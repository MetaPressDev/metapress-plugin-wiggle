import { WiggleRigHelper } from 'wiggle/helper'
import { WiggleRig } from 'wiggle/rig'

export default class WiggleBonesModifier {

    /** Modifier info */
    name = 'Wiggle Bones'
    description = `Uses the Wiggle library to animate the skeleton of a model.`
    icon = require('./bone.svg')
    settings = [
        { type: 'checkbox', id: 'wigglebones_visualize', name: 'Visualize', help: 'Show the wiggle bones in the viewport.' }
    ]

    /** Called on load */
    async onLoad() {

        // Find skinned mesh
        this.skinnedMesh = this.renderer.object?.getObjectByProperty('type', 'SkinnedMesh')
        if (!this.skinnedMesh)
            throw new Error(`No skeleton found on this object.`)

        // Create wiggle rig
        this.wiggleRig = new WiggleRig(this.skinnedMesh.skeleton)

        // Check settings
        this.onEntityUpdated()

    }

    /** Called when the associated entity is updated */
    onEntityUpdated() {

        // Check if fields changed
        if (!metapress.entities.didSettingsChange(this))
            return

        // Create or remove the visualizer
        if (this.entity.wigglebones_visualize && !this.visualizer) {

            // Create it
            this.visualizer = new WiggleRigHelper({ skeleton: this.skinnedMesh.skeleton, dotSize: 0.15, lineWidth: 0.01 })
            metapress.renderer.scene.add(this.visualizer)

        } else if (!this.entity.wigglebones_visualize && this.visualizer) {

            // Remove it
            metapress.renderer.scene.remove(this.visualizer)
            // this.visualizer.dispose()
            this.visualizer = null

        }

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

        // Remove visualizer
        if (this.visualizer) {
            metapress.renderer.scene.remove(this.visualizer)
            // this.visualizer.dispose()
            this.visualizer = null
        }
        
    }

}