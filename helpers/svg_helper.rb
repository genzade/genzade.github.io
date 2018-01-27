def svg(name)
  file_path = File.join(app.root, config[:svgs_dir], "#{name}.svg")

  return 'SVG file not found' unless File.exist?(file_path)

  File.read(file_path)
end
