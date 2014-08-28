define(['grid/color', 'chroma'], function(Color, chroma) {
  var Group, Variant, Color;

  ColorUtils = {}

  ColorUtils.mix = function(group, variant, grid) {
    var color
    Group = Group || require('grid/group')
    Variant = Variant || require('grid/variant')

    if (!Group.isGroup(group)) throw TypeError('mix expects a Group');
    if (!Variant.isVariant(variant)) throw TypeError('mix expects a Variant');

    group.variants.push(variant)
    variant.groups.push(group)

    color = new Color(group, variant)

    //console.log(grid)
    if (grid) {
      if (!group.grid)   { grid.groups.push(group) }
      if (!variant.grid) { grid.variants.push(variant) }
      grid.colors.push(color)
    }

    return color
  }

  return ColorUtils
})
