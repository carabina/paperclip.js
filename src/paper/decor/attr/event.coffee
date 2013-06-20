# see http://arantius.com/misc/webref/domref/dom_event_ref33.html
class EventDecor extends require("./dataBind")

  ###
  ###
  
  watch: false

  ###
  ###

  propagateEvent: false

  ###
  ###

  preventDefault: false

  ###
  ###

  bind: () ->
    super()

    # keyup keydown mouseup mousedown 

    if @name in ["click", "mouseup", "mousedown"]
      @preventDefault = true


    event = (@event or @name).toLowerCase()
    name  = @name.toLowerCase()

    if name.substr(0, 2) is "on"
      name = name.substr(2)
    
    if event.substr(0, 2) is "on"
      event = event.substr(2)



    @_pge = "propagateEvent." + name
    @_pde = "preventDefault." + name

    # set default properties for event modifiers
    for ev in [@_pge, @_pde]
      prop = ev.split(".").shift()
      if not @clip.get(ev)? and @[prop]?
        @clip.set ev, @[prop]

    $(@element).bind event, @_onEvent

  ###
  ###

  _onEvent: (event) =>

    if @clip.get("propagateEvent") is true or @clip.get(@_pge) is true
      event.stopPropagation()

    if @clip.get("preventDefault") is true or @clip.get(@_pde) is true
      event.preventDefault()

    return if @clip.get("disable")

    @clip.data.set "event", event
    @_update event

  ###
  ###

  _update: (event) ->
    @script.update()


module.exports = EventDecor