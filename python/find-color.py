# Script for selecting target areas from source image where the color value is similar enough to given target color
# Use: python find-color.py "path/to/folder" "source-image-src" red green blue accuracy
# color values should be integers and accuracy float. Good first try as accuracy is 0.1
# creates an image with target areas to the given folder

from PIL import Image
import sys

def findColors(folder, src, target, accuracy):
  img = Image.open(folder + src)
  pixels = img.load()
  sum = 1.0 * (target[0] + target[1] + target[2])
  for i in range(img.size[0]):
    for j in range(img.size[1]):
      rgb = pixels[i, j]
      rgb_sum = 1.0 * (rgb[0] + rgb[1] + rgb[2])
      if rgb_sum != 0 and not (abs(target[0] / sum - rgb[0] / rgb_sum) < accuracy and abs(target[1] / sum - rgb[1] / rgb_sum) < accuracy and abs(target[2] / sum - rgb[2] / rgb_sum) < accuracy):
        pixels[i, j] = (0, 0, 0)
  img.save(folder + "color-model-" + src)
  print('Varimuotti tallennettu')

folder = sys.argv[1]
src = sys.argv[2]
r = int(sys.argv[3])
g = int(sys.argv[4])
b = int(sys.argv[5])
target = (r, g, b)
accuracy = float(sys.argv[6])
findColors(folder, src, target, accuracy)