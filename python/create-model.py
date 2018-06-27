# Script for transforming the target area image from find-color.py to a model image for colorize.py
# Use: python create-model.py "path/to/folder/" "target-area-image-src" red green blue
# color values should be integers and represent the same targetted color as in find-color.py
# creates a new model image to the given folder

from PIL import Image
import sys
import colorsys

def createModel(folder, src, target):
  img = Image.open(folder + src)
  pixels = img.load()
  target_value = colorsys.rgb_to_hsv(target[0] / 255.0, target[1] / 255.0, target[2] / 255.0)[2]
  for i in range(img.size[0]):
    for j in range(img.size[1]):
      rgb = pixels[i, j]
      if not (rgb[0] == 0 and rgb[1] == 0 and rgb[2] == 0):
        rgb_value = colorsys.rgb_to_hsv(rgb[0] / 255.0, rgb[1] / 255.0, rgb[2] / 255.0)[2]
        new_rgb = int((min(max((rgb_value - target_value) / target_value, -1), 1) + 1) / 2.0 * 255.0);
        pixels[i, j] = (new_rgb, new_rgb, new_rgb)
  img.save(folder + "white-" + src)
  print('Valkomuotti tallennettu');


folder = sys.argv[1]
src = sys.argv[2]
r = int(sys.argv[3])
g = int(sys.argv[4])
b = int(sys.argv[5])
target = (r, g, b)
createModel(folder, src, target)