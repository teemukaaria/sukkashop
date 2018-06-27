# Script to colorize a target image with the given color according to a model image
# Use: python colorize.py "path/to/folder/" "target-image-src" "model-image-src" red green blue
# color values should be integers and model image made by create-model.py
# creates a new colorized image to the given folder

from PIL import Image
import sys
import colorsys

def colorize(folder, src, model, target):
  img_src = Image.open(folder + src)
  pixels_src = img_src.load()
  img_model = Image.open(folder + model)
  pixels_model = img_model.load()
  target_hsv = colorsys.rgb_to_hsv(target[0] / 255.0, target[1] / 255.0, target[2] / 255.0)
  for i in range(img_src.size[0]):
    for j in range(img_src.size[1]):
      model_rgb = pixels_model[i, j]
      if not (model_rgb[0] == 0 and model_rgb[1] == 0 and model_rgb[2] == 0):
        model_value = model_rgb[0] / 255.0 * 2;
        new_rgb = colorsys.hsv_to_rgb(target_hsv[0], target_hsv[1], min(1, target_hsv[2] * model_value))
        pixels_src[i, j] = (int(new_rgb[0] * 255), int(new_rgb[1] * 255), int(new_rgb[2] * 255))
  img_src.save(folder + 'colorized-' + src);
  print('Varitetty kuva tallennettu')
      

folder = sys.argv[1]
src = sys.argv[2]
model = sys.argv[3]
r = int(sys.argv[4])
g = int(sys.argv[5])
b = int(sys.argv[6])
target = (r, g, b)
colorize(folder, src, model, target)