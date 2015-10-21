%w( home tickers ).each do |controller|
  Rails.application.config.assets.precompile += ["#{controller}.js", "#{controller}.css"]
end

Rails.application.config.assets.precompile += ["tickers_wordcloud.js"]